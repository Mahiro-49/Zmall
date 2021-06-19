<template>
  <div>
    {{iid}}
  </div>
</template>

<script>
export default {
  name: "Detail",
  // created() {
  //   this.iid = this.$route.params.iid
  // },
  activated() {
    this.iid = this.$route.params.iid
  },
  data() {
    return {
      iid: null
    }
  }
}
</script>

<style>

</style>