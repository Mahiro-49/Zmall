<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @clickItem="clickItem" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "components/common/scroll/Scroll.vue"
import GoodsList from "components/content/goods/GoodsList.vue"

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail.js"
import {itemListenerMixin} from '../../common/mixin.js'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,   
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin],

  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      theThemeTopY: [],
      currentIndex: 0
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
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

      // 7.获取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    }),
    
    // 3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      
    },
    clickItem(index) {
      this.$refs.scroll.scrollTo(0, -this.theThemeTopY[index], 100);
      
    },
    contentScroll(position) {
      this.theThemeTopY = []
      this.theThemeTopY.push(0);
      this.theThemeTopY.push(this.$refs.param.$el.offsetTop);
      this.theThemeTopY.push(this.$refs.comment.$el.offsetTop);
      this.theThemeTopY.push(this.$refs.recommend.$el.offsetTop);
      // 内容滚动 显示正确的标题
      const positionY = -position.y;
      let length = this.theThemeTopY.length;
      for(let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.theThemeTopY[i] && positionY < this.theThemeTopY[i+1]) || (i === length - 1 && positionY > this.theThemeTopY[i]))) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    }
    

  },
  
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
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>