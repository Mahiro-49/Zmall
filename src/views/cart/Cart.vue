<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
      <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar"
import CartList from "./childComps/CartList.vue"

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
  },
  computed: {
    cartLength() {
      return this.$store.state.carList.length
    }
  }
}
</script>

<style>

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>