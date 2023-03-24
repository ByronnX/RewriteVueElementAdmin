// 引入Vue
import Vue from "vue";
// 引入vue-router
import Router from "vue-router";
// 路由就是一个插件，需要use
Vue.use(Router);

// 引入layout组件
// layout组件非常重要
// 一级路由出口中，匹配layout组件
import Layout from "@/layout";

// 引入其他四个路由模块
/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import tableRouter from "./modules/table";
import nestedRouter from "./modules/nested";
import bak from "./bak.js";
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// canstantRoutes是静态路由
// 本项目，把路由分成了两大模块：静态路由、动态路由
// 静态路由：所有的用户可以访问，不需要全新啊
// 动态路由: 需要权限，如果有权限，就可以访问，如果没权限，就不能访问
// 路由规则: 就是一个对象
//    path:'/redirect',   访问的url
//    component：Layout,  访问出口中放什么组件  在一级路由出口中方Layout组件-------》很关键
//    hidden: true        隐藏  在侧边栏中不能看到该路由侧边栏项
//    children：[]        配置二级路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        //  在二级路由出口中放  @/views/redirect/index  这个组件
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    //  当访问/login时，  我就在一级路由出口中放置  @/views/login/index
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashbof@ard",
        meta: { title: "首页大屏", icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
//  asyncRoutes是动态路由
//  页面级（路由级）权限：
//    不同用户，登录到系统，看到的侧边栏是不一样的，也就是有不同的页面
//    同一个页面，有的用户可以访问，有的用户可以访问
export const asyncRoutes = [
  {
    path: "/good",
    component: Layout,
    redirect: "good/list",
    alwaysShow: true,
    name: "GoodManage",
    meta: {
      title: "商品管理",
      icon: "shopping",
      roles: ["admin", "editor"],
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/good/good-list"),
        name: "GoodList",
        meta: {
          title: "商品列表",
          roles: ["admin", "editor"],
        },
      },
      {
        path: "add",
        component: () => import("@/views/good/good-form"),
        name: "GoodForm",
        hidden: true,
        meta: {
          title: "添加商品",
          roles: ["admin", "editor"],
        },
      },
    ],
  },
  {
    path: "/student",
    component: Layout,
    redirect: "student/list",
    alwaysShow: true,
    name: "StudentManage",
    meta: {
      title: "学生管理",
      icon: "people",
      roles: ["admin", "editor"],
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/student/student-list"),
        name: "StudentList",
        meta: {
          title: "学生列表",
          roles: ["admin", "editor"],
        },
      },
      {
        path: "add",
        component: () => import("@/views/student/student-form"),
        name: "StudentForm",
        meta: {
          title: "添加学生",
          roles: ["admin", "editor"],
        },
      },
    ],
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  ...bak,
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

// 创建一个路由对象，这个路由对象只包括了静态路由
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// 重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
// 导出去
export default router;

/*
Q&A
  Q:你做的管理系统，你是如何处理权限的问题的？
  A:我们之前的公司是中小公司，做的项目，大概有30个左右的模块，所以权限这一块，就前端去处理的。我们处理的流程大致是这样的，前端登录换取token，在导航守卫中，实现权限设计，首先判断有没有token，没有token，直接跳到登录页面。有token会进一步判断vuex中有没有用户信息，如果没有用户信息，拿着token调用接口获取用户信息，用户信息中保存了最重要的字段，就是角色，有了角色之后，通过算法生成当前用户可访问的动态路由规则（算法大致是使用后端返回的角色和路由元信息中的角色进行对比，得到可以访问的动态路由规则），有了动态访问的路由规则，再通过addRoutes方法，把得到的动态访问的路由规则添加到路由系统。

  Q:前端做权限这一块，你感觉有什么不足？
  A:如果要修改权限，必须要去修改前端代码，重新打包，重新上线。前端处理权限 只适合中小项目（模块少，角色少），一般中小公司权限处理都是前端实现的

  Q:管理系统左侧的菜单时什么时候生成的？
  A:在登陆流程中，登录成功后，得到的token，根据token获取用户信息，用户信息中包含角色，根据角色生成可访问的动态路由规则，把路由规则也保存到了vuex中，跳到系统内部页面，渲染layout组件，在渲染layout组件时，会渲染菜单，再刷新流程中，使用token换取用户信息，生成可访问的动态路由规则，保存到vuex中，再次渲染layout时，生成左侧菜单。
*/
