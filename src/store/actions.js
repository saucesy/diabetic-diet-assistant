import {getSelfProfile, login, register} from "@/api/user";
import {removeToken, setToken} from "@/utils/auth"
import {Message} from 'element-ui'

export default {
  toggleDevice({commit}, payload) {
    commit('toggleDevice', payload)
  },

  /**
   * login
   *
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   */
  login({commit}, payload) {
    return new Promise((resolve, reject) => {
      login(payload).then((res) => {
        const { id, data } = res.data
        setToken(id, payload.remember ?? false)
        commit('SET_TOKEN', id)
        commit('SET_PROFILE', data)
        return resolve(res)
      }).catch((res)=>{
        // uses element-ui message
        Message.error(res.msg)
        return reject(res)
      })
    })
  },

  /**
   * register
   *
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   */
  register({commit}, payload) {
    return new Promise((resolve, reject) => {
      register(payload).then((res) => {
        // Do set token after login
        // const { id } = res.data
        // setToken(id)
        // commit('SET_TOKEN', id)
        return resolve(res)
      }).catch((res)=>{
        // uses element-ui message
        Message.error(res.msg)
        return reject(res)
      })
    })
  },

  /**
   * get self profile
   *
   * @param commit
   * @returns {Promise<unknown>}
   */
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