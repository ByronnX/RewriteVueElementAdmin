import Vue from "vue";
import Router from "vue-router";
// 因为路由就是一个插件，所以需要引入Vue来调用use方法传入Router
Vue.use(Router);
import Layout from "@/layout";
export const constantRoutes = [
  {
    //  当访问/login时，  我就在一级路由出口中放置  @/views/login/index
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    //任意的路径名都会被重定向到仪表盘页 然后展示layout组件，layout组件有二级路由，而仪表盘页就被嵌套在layout组件里面
    path: "/",
    component: Layout,
    redirect: "/dashboard", //重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashbof@ard",
        meta: { title: "首页大屏", icon: "dashboard", affix: true },
      },
    ],
  },
];

export const asyncRoutes = [];
const createRouter = () =>
  new Router({
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
export default router;
