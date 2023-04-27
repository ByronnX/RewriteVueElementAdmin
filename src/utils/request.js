import axios from "axios";
import { getToken } from "@/utils/auth";
import store from "@/store";
import { MessageBox } from "element-ui";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // 如果store里有token 就赋值给config.headers["X-Token"]
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message || "Error", // 如果请求里有message就显示，没有的话就显示“Error”
        type: "error",
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // token过期了,或者token非法
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm("当前登录失效", "请重新登录", {
          confirmButtonText: "重新登陆",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export default service;
