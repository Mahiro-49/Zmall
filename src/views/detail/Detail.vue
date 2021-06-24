<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"

import Scroll from "components/common/scroll/Scroll.vue"

import {getDetail, Goods, Shop, GoodsParam} from "network/detail.js"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,   
    DetailGoodsInfo,
    DetailParamInfo,

    Scroll,
  },
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.data.result
      // 1.获取顶部轮播数据
      this.topImages = res.data.result.itemInfo.topImages

    // 3.获取商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    
    // 4.创建店铺信息对象
    this.shop = new Shop(data.shopInfo)

    // 5.获取商品详细信息
    this.detailInfo = data.detailInfo 

    // 6.获取参数信息
    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods: {
    imageLoad() {
      this.$$refs.scroll.refresh()
    }
  }
  
}
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 999;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>