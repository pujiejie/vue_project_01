import Vue from 'vue'
import VueRouter from 'vue-router'

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => { });
}

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
        name: 'dashboard',
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: '/lesson',
    component: LayOut,
    children: [
      {
        path: '',
        component: () => import("@/views/Lesson/index"),
        meta: {
          title: "课程管理"
        }
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
