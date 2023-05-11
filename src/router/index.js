import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("@/views/Login/index")
const LayOut = () => import("@/LayOut/index")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LayOut,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import("@/views/DashBoard/index"),
        name: 'dashboard'
      }
    ]
  },
  {
    path: '/lesson',
    component: LayOut,
    children: [
      {
        path: '',
        component: () => import("@/views/Lesson/index")
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
