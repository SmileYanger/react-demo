<template>
  <div style="background: #fff">
    <div class="title">
      房屋特色
    </div>
    <div class="content_11">
      <div class="detailContent">{{data.body}}</div>
    </div>
    <div class="more">查看更多信息</div>
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

<style lang="stylus" type="text/stylus" scoped>
  .title
    margin 0.35rem 0.25rem
    font-size 0.3rem
    color rgb(51, 51, 51)
    font-weight bold

  .content_11
    margin-left 0.25rem
    margin-bottom 0.3rem
    border-bottom 1px solid rgb(238, 238, 238)
    font-size 0.26rem
    color rgb(51, 51, 51)
    .detailContent
      color rgb(133, 133, 133)
      margin-right 0.25rem
      margin-bottom 0.3rem
      font-size 0.24rem

  .more
    height 0.7rem
    line-height 0.5rem
    color rgb(133, 133, 133)
    font-size 0.24rem
    border-bottom 0.2rem solid rgb(238, 238, 238)
    text-align center
</style>
