import Vue from "vue";
import Router from "vue-router";
// 因为路由就是一个插件，所以需要引入Vue来调用use方法传入Router
Vue.use(Router);

export const constantRoutes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/index"),
  },
];

const createRouter = () =>
  new Router({
    routes: constantRoutes,
  });

const router = createRouter();

export default router;
