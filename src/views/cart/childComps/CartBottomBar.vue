<template>
  <div class="bottom-bar">
    <div class="check-content">
       <CheckButton class="check-button" 
       :is-checked="isSeclectAll" 
       @click.native="checkBtnClick">
       </CheckButton>
       <span>全选</span>
    </div>
    <div>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.carList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.carList.filter(item => item.checked).length
    },
    isSeclectAll() {
      if (this.$store.state.carList.length !== 0) {
        return !this.$store.state.carList.find(item => !item.checked)
      }
      
    }
  },
  methods: {
    checkBtnClick() {
      if (this.isSeclectAll) {
        // 全部选择时
        this.$store.state.carList.forEach(item => item.checked = false);
      } else {
        // 部分或者全部不选中
        this.$store.state.carList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.$store.state.carList.find(item => item.checked)) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button{ 
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}

.total-price {
  margin-left: 20px;
  flex: 1;
}

.calculate{ 
  width: 90px;
  margin-left: 30px;
  background-color: orangered;
  color: #fff;
  text-align: center;
}
</style>