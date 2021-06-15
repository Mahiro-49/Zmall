<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/Navbar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue'

import {getHomeMultidata} from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      // 保存数据使用的
      banners: [],
      recommends: [],
    }
  },
  created() {
    // 请求多个数据 通过res拿到请求的结果
    getHomeMultidata().then(res => {
      // 将res里的数据保存下来
      console.log(res);
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    })
  }
}
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>