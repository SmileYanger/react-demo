<template>
  <div style="background: white">
    <div class="messageLabel">
      <div>
        交租：
        <span>{{data.zujin}}</span>
      </div>
      <div>
        朝向：
        <span>{{data.orientation}}</span>
      </div>
      <div>
        装修：
        <span>{{data.zhuangxiu}}</span>
      </div>
      <div>
        楼层：
        <span>{{data.louceng}}</span>
      </div>
      <div>
        小区：
        <span>{{data.village}}</span>
      </div>
      <div>
        时间：
        <span>{{data.time}}</span>
      </div>
      <div>
        <span></span>
      </div>
    </div>
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
  .label
    color rgb(88, 124, 172)
    font-size 0.2rem
    margin 0.2rem 0
    margin-left 0.18rem
    margin-top 0.3rem
    span
      display inline-block
      background-color rgb(244, 247, 251)
      padding 0.05rem 0.1rem
      margin-right 0.1rem

  .messageLabel
    margin-top 0.3rem
    border-bottom 0.2rem solid rgb(238, 238, 238)
    display flex
    justify-content space-between
    flex-wrap wrap
    div
      margin 0.2rem 0 0.2rem 0.25rem
      font-size 0.26rem
      color rgb(178, 178, 178)
      width 44%
      span
        color rgb(51, 51, 51)
</style>
