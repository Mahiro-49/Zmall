<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" class="tab-control"></tab-control>
    
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad='swiperLoad'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    
    <!-- .native修饰符:监听一个组件的原生事件时使用 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/Navbar.vue';
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "../../common/utils"

export default {
  name: "Home",
  components: { 
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    NavBar,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 保存数据使用的
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    });
  },
  destroyed() {
    console.log("home dest");
  },
  activated() {
    // 设置时间后不会有返回原来位置后置顶的效果
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0 ,0)
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000
      // 2.决定tabControl是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperLoad() {
      // 2.获取tabControl的offsetTop
      // 所有组件都有一个属性$el： 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {  
        // 将res里的数据保存下来
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home {
  /* 视口高度（vh -> viewheight） */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  height: calc(100% - 50px);
  overflow: hidden;
}

</style> 