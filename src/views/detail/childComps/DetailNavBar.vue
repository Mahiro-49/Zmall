<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="clickBack"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="clickItem(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/Navbar.vue"

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    clickItem(index) {
      this.currentIndex = index;
      this.$emit('clickItem', index);
    },
    clickBack() {
      // 返回上一级
      this.$router.back()
    }
  }
}
</script>

<style>
.title {
  display: flex;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 6px;
  margin-right: 15px;
}
</style>