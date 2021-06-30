<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in carList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue"

import CartListItem from "./CartListItem.vue"
import CartBottomBar from "./CartBottomBar.vue"

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
    CartBottomBar
  },
  computed: {
      carList() {
        return this.$store.state.carList
      }
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px) ;
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>