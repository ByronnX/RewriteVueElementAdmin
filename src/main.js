// 引入vue
import Vue from "vue";
import Cookies from "js-cookie";
// 引入重置样式，把一些默认的样式重置掉
import "normalize.css/normalize.css"; //npm install --save normalize.css
// 引入APP组件
import App from "./App";
// element是PC端的UI组件库
import Element from "element-ui";
// 引入ElementUI的样式
import "./styles/element-variables.scss";
// 引入自己封装的icon图标
import "./icons"; // icon
// 引入自己编写的全局样式
import "@/styles/index.scss"; // global css
import "./permission";
//引入路由
import router from "./router";
import store from "./store";
if (process.env.NODE_ENV === "production") {
  // 导入mock模块，模拟接口的，本项目中的接口都是模拟的，都是假的
  const { mockXHR } = require("../mock");
  mockXHR();
}
Vue.use(Element, {
  // 比如Button 可以设置，如果不设置默认是medium
  size: Cookies.get("size") || "medium", // set element-ui default size
  // locale：enLang表示组件使用英文
  // locale: enLang // 如果使用中文，无需设置，请删除
});
Vue.config.productionTip = false;
// 去new一个Vue
new Vue({
  el: "#app", // 关联
  router,
  store,
  render: (h) => h(App), // 渲染
});
