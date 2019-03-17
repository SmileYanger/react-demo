<template>
  <div class="reply">
    <div class="reply_title">
      <div class="avatar">
        <img :src="data.avatar" alt="">
      </div>
      <div>
        <div class="name">{{data.name}}</div>
        <div class="time">{{data.time}}</div>
      </div>
    </div>
    <!--<div class="btn_reply">-->
      <!--<i class="iconfont">&#xe621;</i>-->
      <!--<span>回复</span>-->
    <!--</div>-->
    <div class="reply_content">
      {{data.type}}：{{data.content}}
    </div>
    <div class="content">
      <img :src="data.result.avatar" alt="">
      <div>{{data.result.content}}</div>
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

<style scoped lang="stylus" type="text/stylus">
  .reply
    margin 0.3rem 0.2rem
    position relative
    border-bottom 1px solid #f6f6f6
    .reply_title
      display flex
      .avatar
        width 0.66rem
        height 0.66rem
        overflow hidden
        margin-right 0.2rem
        margin-top 0.05rem
        img
          width 100%
      div
        .name
          font-size 0.28rem
          color #666
        .time
          font-size 0.22rem
          color #999
    .btn_reply
      font-size 0.24rem
      color #858585
      position absolute
      right 0
      top 0rem
      .iconfont
        margin-right 0.05rem
        position relative
        top 0.04rem
    .reply_content
      margin-top 0.3rem
      font-size 0.3rem
      color #333
      word-wrap break-word
    .content
      font-size 0.26rem
      color #666
      height 1.3rem
      display flex
      justify-content space-between
      background #f6f6f6
      margin 0.3rem 0 0.24rem 0
      img
        width 1.3rem
      div
        margin 0.3rem 0.2rem
        line-height 1.5
        width calc(100% - 1.7rem)
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
</style>
