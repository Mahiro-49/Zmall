<template>
  <div id="app">
    <!-- exclude: 使目标排除keep-alive -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue'


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import './assets/css/base.css';

</style>
