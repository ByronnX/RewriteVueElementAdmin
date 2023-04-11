// 引入vue
import Vue from "vue";
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
//引入路由
import router from "./router";

Vue.use(Element);
Vue.config.productionTip = false;
// 去new一个Vue
new Vue({
  el: "#app", // 关联
  router,
  render: (h) => h(App), // 渲染
});
