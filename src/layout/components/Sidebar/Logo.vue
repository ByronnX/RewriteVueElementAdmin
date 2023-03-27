<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <!-- 要进行动画的话 就要用transition标签包裹住 -->
    <!-- 
      transition：Vue 的内置动画标签
      transition 标签只能包含 1 个元素；如果里面写了多个元素，则只生效第一个
      transition 包裹的标签需要设置 v-show / v-if 属性控制元素的显示
      
      transform是 转换，指的是改变所在元素的外观，它有很多种手段(转换函数)来改变外观，例如 位移、缩放、旋转 等，而其中的位移的函数名就叫translate，所以说，translate是transform的一部分。
      transition是 过渡，指的是某个CSS属性值如何平滑的进行改变，就是平常说的 动效。而transform是没有动画效果，你改变了它的值，元素的样子就唰的改变了。
     -->
    <transition name="sidebarLogoFade">
      <!-- 如果collapse为true 则运行这里 -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- 如果折叠了 并且有logo这个变量 则显示logo 否则只显示title -->
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <!-- 如果collapse为false 则运行这里 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- 如果没有折叠的话 有logo显示logo 没有就不显示 但是title一定显示 -->
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Element Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
