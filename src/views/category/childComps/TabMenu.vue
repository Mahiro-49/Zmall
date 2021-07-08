<template>
  <div>
    <scroll id="tab-menu">
      <div class="menu-list">
        <div class="menu-list-item" 
             :class="{active: index === currentIndex}" 
             v-for="(item, index) in categories"
             :key="index"
             @click="itemClick(index)">
          {{item.title}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'


export default {
  name: 'TabMenu',
  components: {
    Scroll
  },
  props: {
    categories: Array,
    default: []
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index)
    }
  }
}
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  width: 100px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>