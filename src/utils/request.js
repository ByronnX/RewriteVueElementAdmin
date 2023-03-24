import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
// 创建一个axios实例
// let baseURL = "/";

// let baseURL = "/api/v1/element";
const service = axios.create({
  //  baseUrl是后端服务器的地址
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation

      config.headers["X-Token"] = getToken();
      // config.headers["Authorization"] = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // 给出响应
    // res是服务器响应的结果
    // 状态码分两类: 1)Http状态码 2)业务状态码
    if (res.code !== 20000) {
      // 说明服务器没有响应正确的数据
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // token过期了,或者token非法
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm("当前登录失效", "请重新登录", {
          confirmButtonText: "重新登录",
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
      //  表示服务器响应了正确的数据
      return res;
    }
  },
  (error) => {
    //  登录流程中的弹窗=====>响应拦截器
    //  如果没有给出响应
    //  我们刚才把模拟接口注释掉了,服务器肯定不会给出响应
    console.log("err" + error); // for debug
    //  Message 是Element中的组件,提示组件
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
