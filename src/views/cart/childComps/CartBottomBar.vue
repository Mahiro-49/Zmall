<template>
  <div class="bottom-bar">
    <div class="check-content">
       <CheckButton class="check-button"></CheckButton>
       <span>全选</span>
    </div>
    <div>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
    </div>
    <div class="calculate">
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
    }
  },
  methods: {
    checkBtnClick() {
      // 1.判断是否有未选中的按钮
    }
  }
}
</script>

<style>
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