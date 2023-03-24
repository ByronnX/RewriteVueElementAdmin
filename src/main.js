// 引入vue
import Vue from "vue";

// 引入js-cookie
// 使用来操作cookie的，后端返回的一个token就存储在cookie中
// 之前我们是存储再localstroage中
import Cookies from "js-cookie";

// 引入重置样式，把一些默认的样式重置掉
import "normalize.css/normalize.css"; // a modern alternative to CSS resets

// vant是手机端的UI库
// element是PC端的UI组件库
import Element from "element-ui";
// 引入ElementUI的样式
import "./styles/element-variables.scss";
// 引入国际包 可以做到国际化
import enLang from "element-ui/lib/locale/lang/en"; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

// 引入自己编写的全局样式
import "@/styles/index.scss"; // global css

// 引入APP组件
import App from "./App";
// 引入仓库
import store from "./store";
// 引入路由
import router from "./router";

// 引入自己封装的icon图标
import "./icons"; // icon
// 引入自己编写的权限控制模块-----面试必问
import "./permission"; // permission control
// 引入日志包
import "./utils/error-log"; // error log

// 引入过滤器，在vue中过滤器实质上是对文本进行格式化，
// 在渲染前对数据进行处理和筛选。
// 在读别人的代码时，不能有语法障碍
import * as filters from "./filters"; // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// process是node中的全局变量
// 当通过npm run build时，node_env就是production
// 当通过npm run dev时，node_dev就是development
// process.env.NODE_ENV === 'production' 表示是生产环境
// 关闭mock接口
if (process.env.NODE_ENV === "production") {
  // 导入mock模块，模拟接口的，本项目中的接口都是模拟的，都是假的
  const { mockXHR } = require("../mock");
  mockXHR();
}

//Vue.use(Element) PC端UI组件库
//  在vue的生态中，你使用别人封装的模块，99%都是以插件的形式进行封装
//  Vue.use在注册组件
Vue.use(Element, {
  // 比如Button 可以设置，如果不设置默认是medium
  size: Cookies.get("size") || "medium", // set element-ui default size
  // locale：enLang表示组件使用英文
  // locale: enLang // 如果使用中文，无需设置，请删除
});

// 注册全局过滤器
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 关闭生产环境下的提示
Vue.config.productionTip = false;

// 去new一个Vue
new Vue({
  el: "#app", // 关联
  router,
  store,
  render: (h) => h(App), // 渲染
});
