import request from "@/api/index";

export function getList() {
  return request({url: '/food'})
}

