<template>
  <div>
    <div class="secondMessageLabel">
      <div>
        类型：
        <span>{{data.card_time}}</span>
      </div>
      <div>
        发布时间：
        <span>{{data.time}}</span>
      </div>
      <div>
        新旧：
        <span>{{data.xinjiu}}</span>
      </div>
      <div>
        地点：
        <span>{{data.address}}</span>
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

<style lang="stylus" type="text/stylus" scoped>
  .secondMessageLabel
    border-bottom 0.2rem solid rgb(238, 238, 238)
    display flex
    justify-content space-between
    flex-wrap wrap
    div
      margin 0.15rem 0 0.15rem 0.25rem
      font-size 0.26rem
      color rgb(178, 178, 178)
      width 44%
      span
        color rgb(51, 51, 51)
</style>
