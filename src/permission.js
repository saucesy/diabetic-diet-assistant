import store from "@/store"
import router from "@/router"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from "element-ui"
import {getToken} from "@/utils/auth"

// uses nprogress
NProgress['configure']({showSpinner: true})

// pages accessible without login
const whiteList = ['/login', '/calender']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      try {
        // get user profile
        await store.dispatch('getSelfProfile')
        next()
      } catch (e) {
        await store.dispatch('resetToken')
        // uses element-ui
        Message.error(e.message || 'Error')
        // redirect to login page
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    // accessible page
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})