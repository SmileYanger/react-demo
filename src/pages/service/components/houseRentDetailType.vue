<template>
  <div class="detailType">
    <div class="item">
      <div class="money">{{data.jiage}}<span style="font-size: 0.24rem">元/月</span></div>
      <div>租金</div>
    </div>
    <div class="line"></div>
    <div class="item">
      <div class="money">{{data.huxing}}</div>
      <div>户型</div>
    </div>
    <div class="line"></div>
    <div class="item">
      <div class="money">{{data.mianji}}㎡</div>
      <div>建筑面积</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      data: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .detailType
    display flex
    justify-content space-around
    height 1.16rem
    border-top 1px solid rgb(238, 238, 238)
    border-bottom 1px solid rgb(238, 238, 238)
    padding 0.3rem 0.25rem 0 0.25rem
    background: #fff
    .line
      width 2px
      height 0.4rem
      background rgb(238, 238, 238)
      margin-top 0.35rem
    .item
      text-align center
      color rgb(178, 178, 178)
      font-size 0.26rem
      .money
        color rgb(255, 0, 0)
        font-size 0.32rem
        font-weight bold
</style>
