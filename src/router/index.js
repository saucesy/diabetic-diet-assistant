import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Layout from "@/layout"
import {i18n} from "@/i18n";

const routes = [
  // /login
  {
    path: '/login/:tab?',
    component: () => import('@/views/login'),
    hidden: true,
  },
  // /calender
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
        meta: { title: i18n.t('functions.calender'), icon: 'calender' }
      }
    ]
  },
  // /charts/:othersID?
  {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: ':othersID?',
        name: 'Charts',
        component: () => import('@/views/charts'),
        meta: { title: i18n.t('functions.charts'), icon: 'chart' }
      }
    ]
  },
  // /relations
  {
    path: '/relations',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Relations',
        component: () => import('@/views/relations'),
        meta: { title: i18n.t('functions.relations'), icon: 'relations', notification: true }
      }
    ]
  },
  // /profile/:othersID?
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':othersID?',
        name: 'Profile',
        component: () => import('@/views/profile'),
        meta: { title: i18n.t('functions.profile'), icon: 'profile' }
      }
    ]
  }
]

const router = new VueRouter({ routes })

export default router
