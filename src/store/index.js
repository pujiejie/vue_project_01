import Vue from 'vue'
import Vuex from 'vuex'
import { userProfile } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userProfile: {
      username: "",
      email: "",
      phone: "",
      avator: ""
    }
  },
  mutations: {
    saveToken(state, token) {
      state.token = token;
    },
    saveProfile(state, payload) {
      state.userProfile.username = payload.username;
      state.userProfile.email = payload.email;
      state.userProfile.phone = payload.phone;
      state.userProfile.avator = payload.avator;
    }
  },
  actions: {
    getUserProfile({ commit, state }) {
      return new Promise((resolve, reject) => {
        userProfile(state.token).then(res => {
          if (!res.data.status) {
            commit('saveProfile', res.data)
            resolve();
          } else {
            reject();
          }
        })
      })
    }
  }
})
