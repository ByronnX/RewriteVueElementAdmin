<template> 
  <div id="app">
    <!-- 就是一级路由出口 -->
    <!-- 一会，看路由规则，第一级匹配的路由就是放到此出口中 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
