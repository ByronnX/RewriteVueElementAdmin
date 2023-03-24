import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
//  判断当前用户能不能访问当前路由规则，返回布尔值 
//  hasPermission(['editor'],{path, component, meta:{roles:['editor']}})    ===》 ture
//  hasPermission(['editor'],{path, component, meta:{roles:['baoan']}})     ===》 false
//  hasPermission(['editor'],{path, component, meta:{roles:['editor','baoan']}})    ===》 ture
//  hasPermission(['editor'],{path, component, meta:{}})      ===》 ture
//  roles表示当前角色
//  route表示当前路由规则
function hasPermission(roles, route) {
  //  如果route.meta并且route.meta.roules存在的话
  if (route.meta && route.meta.roles) {
    //  看一下，['editor']有没有在meta:{roles:['editor']}里面
    //  如果在的话，返回true，如果不在就返回false
    /*
        some() 方法会依次执行数组的每个元素：
        如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
        如果没有满足条件的元素，则返回false。
    */
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    //  如果meta中没有roles,返回true，说明当前用户是有权限访问此规则，也就是没有限制，也就是对所有的用户都没有要求
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
//  routes是所有得动态路由规则
//  roles是当前的角色
export function filterAsyncRoutes(routes, roles) {
  //  res中保存了当前用户可以访问的路由规则 
  const res = []
  //  遍历所有的动态路由规则
  routes.forEach(route => { //  route是每一个规则
    //  把每一个规则使用一个临时变量存储
    const tmp = { ...route }
    //  roles是角色 tmp是每一个规则
    if (hasPermission(roles, tmp)) {
      //  如果这个规则中有children，下面就递归的去计算当前用户是否有权限
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 如果hasPermission(roles, tmp)返回一个true，就把这个经过匹配过的路由规则放进res
      res.push(tmp)
    }
  })
  //  最终返回res
  return res
}

const state = {
  routes: [], // 静态路由规则 + 当前用户可访问的动态路由规则
  addRoutes: [] //  只是当前用户可访问的动态路由规则
}

const mutations = {
  //  就是给上面两个状态赋值
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    //  总的routes = 静态的路由规则 + 新的动态的所有的路由规则
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  //  计算生成需要权限访问的动态路由规则
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes // 计算出来需要权限访问的动态路由规则
      //  如果你的roles中包含了admin
      if (roles.includes('admin')) {
        //  把所有的动态路由规则赋值给accessdRoutes
        //  也就是说，如果是admin用户，它可以访问所有的动态路由
        //  也就是，admin用户不需要去计算可访问的动态路由
        accessedRoutes = asyncRoutes || []
      } else {
        //  说明，用户不是admin
        //  filterAsyncRoutes就是去计算出当前用户可以访问哪些动态路由
        //  传进去两个参数 asyncRoutes是所有得路由  roles是当前角色
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      //  commit到mutation改变routes
      commit('SET_ROUTES', accessedRoutes)
      //  执行promise得成功回调把accessedRoutes作为参数返回出去
      resolve(accessedRoutes)
    })
  }
}

//  默认暴露
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
