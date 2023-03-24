//引入路由器
import router from './router'
//引入仓库
import store from './store'
//引入elementui中的一个提示性组件
import { Message } from 'element-ui'
//引入nprogress进度条
import NProgress from 'nprogress' // progress bar
//引入nprogress样式
import 'nprogress/nprogress.css' // progress bar style

//getToken就是从cookies中获取token
//如果登陆了，是有token，如果没有登录，就没有token
import { getToken } from '@/utils/auth' // get token from cookie
//得到页面中的title
import getPageTitle from '@/utils/get-page-title'

//配置nprogress
NProgress.configure({ showSpinner: false }) // NProgress Configuration
//配置白名单  不需要登陆就可以直接访问
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

//全局前置路由守卫
//核心代码都是在守卫中
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()

  // 给页面的title赋值即将前往页面的title名
  document.title = getPageTitle(to.meta.title)

  // 从cookie中获取token  如果有token表示登录了
  const hasToken = getToken()


  if (hasToken) {
    // 表示有token 说明已经登录
    if (to.path === '/login') {
      // 如果你已经登录了后，你又去登录页面，我就给你放行到首页
      next({ path: '/' })
      // 关闭进度条
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 如果你已经登录了，但不是去的登陆页面的话
      // store.getters.roles得到vuex中的角色
      // 如果登录了，我们会调用一个接口，去拿用户信息，在用户信息中，有当前用户的角色
      // 点击登录，先发一个登录请求，服务器响应一个token，前端把token存储到cookie中
      // 紧接着发第二个请求，是用来获取用户信息的，前端把用户信息存储到了vuex中，用户信息中有一个角色
      // 也就是说，在vuex中是可以获取角色的 通过store.getters.roles可以拿到角色
      // store.getters.roles.length > 0 表示vuex是有角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 从vuex中获取角色，直接放行
        next()
      } else {
        // else表示vuex中没有角色 当你又去刷新浏览器时，vuex中就没有角色，vuex中的数据也是存储在内存中的
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // store.dispatch('user/getInfo')   重新获取用户信息    肯定是在vuex中发送ajax请求
          // roles  表示用户信息，用户信息中包含用户角色
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // dispatch('permission/generateRoutes', roles)   根据用户角色，生成路由规则
          // 至于怎么生成的，在后面会解释
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 一个路由器中，可以有很多的规则，计算了当前用户角色有18个规则
          // 利用addRoutes把这18个规则添加到路由器中
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // 上面已经把规则添加到路由器中，放行，此时，你就可以看到，你有权限看到的页面了
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 如果在生成规则时，出问题了
          // store.dispatch('user/resetToken')  清除token
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 重新回到登陆页面
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token的情况
    // 如果你没有token，就看一下你访问的路径有没有在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      //  如果在白名单中 就放行
      next()
    } else {
      // 如果不在白名单中，表示你访问的路由规则需要登陆
      // 既然你需要登录 我就给你放行到登录页面
      next(`/login?redirect=${to.path}`)
      // 关闭进度条
      NProgress.done()
    }
  }
})

//全局后置路由守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
