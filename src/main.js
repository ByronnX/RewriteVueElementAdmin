// 引入vue
import Vue from "vue";

// 引入APP组件
import App from "./App";

// 去new一个Vue
new Vue({
  el: "#app", // 关联
  router,
  store,
  render: (h) => h(App), // 渲染
});
