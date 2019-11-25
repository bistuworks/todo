import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/Home') // 异步加载组件
    },
    {
      path: '/login',
      name: 'home',
      component: () => import('@/pages/login/Login')
    },
    {
      path: '/register',
      name: 'home',
      component: () => import('@/pages/register/Register')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/pages/demo/Demo')
    }
  ]
})
