<template>
  <div class="user">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <svg class="Image-svg left">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登陆/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
          </span>
          <div class="uphone">
            <slot name="user-phone">暂无绑定手机号</slot>
          </div>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style scoped>
.user {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

.Image-svg{
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30xp;
}

.left {
  float: left;
}

.arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

.login-info {
  color: #fff;
  margin: 10px 0 0 10px;
  font-size: 13px;
}

.phone {
  position: relative;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}

.uphone {
  vertical-align: inherit;
  font-size: 13px;
  font-weight: 300;
}

.icon-mobile {
  position: absolute;
  width: 12px;
  height: 18px;
  left: -15px;
  top: 0;
}
</style>