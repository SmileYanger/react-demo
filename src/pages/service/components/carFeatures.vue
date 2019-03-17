<template>
  <div style="background: #fff" v-if="data.body != ''">
    <div class="title">
      {{title}}
    </div>
    <div class="carDetailContent">{{data.body}}</div>
    <div class="line"></div>
    <div class="more">查看更多信息</div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      data: {
        type: Object
      },
      title: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .title
    margin 0.35rem 0.25rem
    font-size 0.3rem
    color rgb(51, 51, 51)
    font-weight bold

  .carDetailContent
    line-height 2
    color rgb(133, 133, 133)
    margin 0.3rem 0.25rem
    font-size 0.26rem
  .line
    border-bottom 1px solid rgb(238, 238, 238)
    margin-bottom 0.3rem
  .more
    height 0.7rem
    line-height 0.5rem
    color rgb(133, 133, 133)
    font-size 0.24rem
    border-bottom 0.2rem solid rgb(238, 238, 238)
    text-align center
</style>
