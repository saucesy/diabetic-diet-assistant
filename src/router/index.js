import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Layout from "@/layout"
import Login from "@/views/login"

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    redirect: '/calender',
    hidden: true
  },
  {
    path: '/calender',
    component: Layout,
    children: [
      {
        path: ':othersID?',
        name: 'Calender',
        component: () => import('@/views/calender'),
        meta: { title: 'Calender', icon: 'calender' }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: ':othersID?',
        name: 'Charts',
        component: () => import('@/views/charts'),
        meta: { title: 'Charts', icon: 'chart' }
      }
    ]
  },
  {
    path: '/relations',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Relations',
        component: () => import('@/views/relations'),
        meta: { title: 'Relations',icon: 'relations', notification: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':othersID?',
        name: 'Profile',
        component: () => import('@/views/profile'),
        meta: { title: 'Profile',icon: 'relations' }
      }
    ]
  }
]

const router = new VueRouter({ routes })

export default router
