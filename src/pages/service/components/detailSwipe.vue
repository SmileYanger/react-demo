<template>
  <div class="detailSwipe" v-if="imgs">
    <mt-swipe :auto="3000" :show-indicators="false">
      <mt-swipe-item v-for="(item, index) in imgs" :key="index">
        <img :src="item">
        <div class="index" v-if="imgs.length > 1">{{(index + 1) + '/' + imgs.length}}</div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    name: "swipe",
    props: {
      imgs: {
        type: Array
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .detailSwipe
    position relative
    height 5rem
    .mint-swipe-items-wrap
      height 5rem
      img
        width 100%
        height 100%
      .index
        background rgba(0, 0, 0, 0.5)
        color #fff
        position absolute
        right 0.2rem
        bottom 0.2rem
        z-index 2
        padding 0.05rem 0.3rem
        border-radius 0.3rem
</style>
