<template>
  <!-- 这是最外层的容器 -->
  <div :class="classObj" class="app-wrapper">
    <!-- 这是控制如果设备为手机的话把侧边栏打开的一个div单标签 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 左边的侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 右边部分的主题区域 -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <!-- 固定的一个表头 -->
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 最上边的导航栏 -->
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <!-- 主体部分结束 -->
      <app-main />
      <!-- 最右边的侧边栏 -->
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
/*
    在Vue文件中的style标签上有一个特殊的属性，scoped。
    当一个style标签拥有scoped属性时候，它的css样式只能用于当前的Vue组件，
    可以使组件的样式不相互污染。如果一个项目的所有style标签都加上了scoped属性，相当于实现了样式的模块化.
    由此可以总结scoped属性的作用：
     形成各个页面之间样式的隔离。他的作用机制是vue内部为每个页面上的样式都加上了唯一的标识符（属性）。
*/
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
