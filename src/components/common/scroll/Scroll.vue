<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { ObserveImage } from 'better-scroll'
import ObserveDom from '@better-scroll/observe-dom'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      observeImage: true,
      keepAlive: true,
    });

    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    });
    };

    // 3.监听上拉加载事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp');
    });
    };
    
  },
  methods: {
    scrollTo(x, y, time=1000) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>