<template>
  <div>
    <swiper class="swiper-det">
    <swiper-item v-for="item in topImages" >
      <img :src="item" alt="">
    </swiper-item>
    </swiper>
  </div>
    
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      defult() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-det {
  height: 300px;
  overflow: hidden;
}
</style>