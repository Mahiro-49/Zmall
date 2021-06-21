<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"

import {getDetail, Goods} from "network/detail.js"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.data.result
      // 1.获取顶部轮播数据
      this.topImages = res.data.result.itemInfo.topImages

    // 3.获取商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    })
  },
  
}
</script>

<style>

</style>