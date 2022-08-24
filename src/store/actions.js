import {getSelfProfile, login, register} from "@/api/user";
import {removeToken, setToken} from "@/utils/auth"
import {Message} from 'element-ui'

export default {
  toggleDevice({commit}, payload) {
    commit('toggleDevice', payload)
  },
  
  // login
  login({commit}, payload) {
    return new Promise((resolve, reject) => {
      login(payload).then((res) => {
        const { id } = res.data
        setToken(id, payload.remember ?? false)
        commit('SET_TOKEN', id)
        return resolve(res)
      }).catch((res)=>{
        Message.error(res.msg)
        return reject(res)
      })
    })
  },
  
  // register
  register({commit}, payload) {
    return new Promise((resolve, reject) => {
      register(payload).then((res) => {
        const { id } = res.data
        // Do set token after login
        // setToken(id)
        // commit('SET_TOKEN', id)
        return resolve(res)
      }).catch((res)=>{
        Message.error(res.msg)
        return reject(res)
      })
    })
  },
  
  // get self profile
  getSelfProfile({commit}) {
    return new Promise((resolve) => {
      getSelfProfile().then((res) => {
        commit('SET_PROFILE', res.data)
        resolve()
      })
    })
  },
  
  // reset token
  resetToken({commit}) {
    return new Promise((resolve) => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}