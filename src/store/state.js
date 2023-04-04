import {getToken} from "@/utils/auth";

export default {
  profile: null,
  token: getToken(),
  device: 'desktop',
  locale: 'zh-cn'
}