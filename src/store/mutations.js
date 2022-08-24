import {getToken} from "@/utils/auth";

export default {
  toggleDevice(state, payload) {
    state.device = payload
  },
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_PROFILE(state, payload) {
    state.profile = payload
  },
  RESET_STATE(state, payload) {
    Object.assign(state, {profile: '', token: getToken()})
  }
}