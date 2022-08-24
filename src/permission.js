import store from "@/store"
import router from "@/router"
import NProgress from 'nprogress'
import {Message} from "element-ui"
import {getToken} from "@/utils/auth"

NProgress['configure']({showSpinner: true})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  
  const hasToken = getToken()
  
  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      try {
        await store.dispatch('getSelfProfile')
        next()
      } catch (e) {
        await store.dispatch('resetToken')
        Message.error(e.message || 'Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
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