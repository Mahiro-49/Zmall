<template>
  <div class="goos">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
    }
    }
  }
}
</script>

<style>
.goos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}


</style>