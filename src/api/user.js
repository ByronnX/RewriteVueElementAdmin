import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data,
  });
}

// 获取用户信息接口
export function getInfo(token) {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token },
  });
}

// 退出登录接口
export function logout() {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post",
  });
}
