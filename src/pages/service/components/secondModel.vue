<template>
  <div class="secondTitleModel">
    <div class="secondTitle">
      <div class="mingzi">{{data.title}}</div>
      <div class="browse">
        <i class="iconfont">&#xebcc;</i>{{data.yuedu}}浏览
      </div>
    </div>
    <div class="money">{{data.jiage}}元</div>
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

<style lang="stylus" type="text/stylus" scoped>
  .secondTitleModel
    padding 0.2rem 0.25rem
    .secondTitle
      display flex
      justify-content space-between
      .mingzi
        font-size 0.36rem
        color rgb(51, 51, 51)
        font-weight bold
      .browse
        color rgb(187,187,187)
        font-size 0.24rem
        .iconfont
          margin-right 0.1rem
          position relative
          top 2px
          font-size 0.36rem
    .money
      font-size 0.32rem
      color red
      margin-top 0.15rem
</style>
