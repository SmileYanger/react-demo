<template>
  <div class="titleModel">
    <h3>{{data.title}}</h3>
    <div class="browse">
      <i class="iconfont">&#xebcc;</i>{{data.yuedu}}浏览
    </div>
  </div>

</template>

<script>
  export default {
    name: "",
    props:{
      data: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .titleModel
    padding 0.4rem 0.25rem 0.2rem
    background #fff
    h3
      font-size 0.36rem
      color rgb(51, 51, 51)
      font-weight bold
    .browse
      color rgb(187,187,187)
      font-size 0.24rem
      margin-top 0.2rem
      .iconfont
        margin-right 0.1rem
        position relative
        top 2px
        font-size 0.36rem
</style>
