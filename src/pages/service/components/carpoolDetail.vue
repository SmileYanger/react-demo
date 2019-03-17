<template>
  <div class="carpool">
    <div class="carpool_title">
      详细信息
    </div>
    <div class="carpoolDetail">
      {{data.remark}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      data:{
        type: Object
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .carpool
    border-bottom 0.2rem solid rgb(238, 238, 238)
    padding 0.25rem
    background #fff
    .carpool_title
      font-size 0.3rem
      color rgb(51, 51, 51)
      font-weight bold
    .carpoolDetail
      margin-top 0.2rem
      color rgb(133, 133, 133)
      font-size 0.24rem
</style>
