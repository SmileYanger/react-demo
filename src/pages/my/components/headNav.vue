<template>
  <div class="navi">
    <div class="iconfont" @click="$router.go(-1)">&#xe671;</div>
    <div class="carpoolTitle">{{title}}</div>
    <div class="rightTitle" @click="gotoService">{{rightTitle}}</div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      title: {
        type: String
      },
      rightTitle: {
        type: String
      }
    },
    methods: {
      gotoService() {
        this.$router.push('./onlineService')
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .navi
    position fixed
    top 0
    left 0
    height 1.28rem
    width 100%
    background #f6f6f6
    .iconfont
      position absolute
      left 0.25rem
      top 0.64rem
    .carpoolTitle
      font-size 0.36rem
      color rgb(51, 51, 51)
      font-weight bold
      text-align center
      margin-top 0.4rem
      line-height 0.88rem
    .rightTitle
      font-size 0.32rem
      color  #666
      position absolute
      right 0.35rem
      top 0.64rem
</style>
