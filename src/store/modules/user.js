// 引入三个接口
import { login, logout, getInfo } from "@/api/user";
// getToken 获取token
// setToken 设置token
// removeToken 删除token
import { getToken, setToken, removeToken } from "@/utils/auth";
// 引入路由器  resetRouter重置路由系统
// 为什么要重置呢？
//    如果一个用户退出登录了，另一个新的用户去登录，路由系统就需要恢复原始状态
import router, { resetRouter } from "@/router";

// 要共享得状态
const state = {
  token: getToken(), // token getToken()从cookie中获取token
  name: "", // 用户名
  avatar: "", // 用户头像
  introduction: "", // 用户简介
  roles: [], // 当前用户所具备得角色
};

// 操作状态，在vuex中，操作状态得唯一方式是mutations
// mutations是改变状态得唯一途径
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

// 有异步操作必须放到actions
const actions = {
  // user login
  // 登录的异步操作
  login({ commit }, userInfo) {
    //  把拿到的登录信息进行解构赋值
    const { username, password } = userInfo;
    //  返回一个promise对象
    return new Promise((resolve, reject) => {
      //  如果Promise对象成功的话，把username、password进行处理之后作为参数数据输入进来
      login({ username: username.trim(), password: password })
        .then((response) => {
          //  从成功的响应对象里面解构赋值data
          const { data } = response;
          //  commit一个mutation，把从respond里取出来的data里面的token传进去，设置到全局state里面的token
          commit("SET_TOKEN", data.token);
          //  再把respond里面的data的token设置到cookie里面的Token
          setToken(data.token);
          //  运行成功结束
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //  把state里面的token作为参数去调用调用user的api接口
      getInfo(state.token)
        .then((response) => {
          const { data } = response;
          //  如果请求了之后没有数据，则代表token验证失败，需要重新登录
          if (!data) {
            reject("Verification failed, please Login again.");
          }
          //  走到这一步就代表token作为参数的请求getInfo请求成功
          //  从请求到的data数据里面解构赋值出下列参数
          const { roles, name, avatar, introduction } = data;

          // roles must be a non-empty array
          //  roles必须是一个非空数组
          //  如果roles为空 或者 该数组长度小于等于0 则直接reject出这个promise
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          //  如果要操作state里的数据必须使用mutation
          //  所以这里是commit给他们这些数据赋值
          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  //  退出登录
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          //  如果退出登录这个api调用成功之后 则调用mutation把token和roles设置为空
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          //  在浏览
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          //  删除所有的tagsview
          dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // reset token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
