<template>
  <div class="navi" @mouseenter="onMouseOver" v-show="navi">
    <div class="iconfont" @click="$router.go(-1)">&#xe671;</div>
    <div class="naviTitle">{{detailTitle}}</div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        navi: false
      }
    },
    props: {
      detailTitle: {
        type: String
      }
    },
    methods: {
      onMouseOver() {
        this.navi = false
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > '0') {
          this.navi = true
        } else {
          this.navi = false
        }
      },
    },
    created() {
      window.addEventListener('scroll', this.handleScroll)
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
    border-bottom 1px solid rgb(230, 230, 230)
    .iconfont
      position absolute
      left 0.25rem
      top 0.64rem
    .naviTitle
      font-size 0.32rem
      color rgb(51, 51, 51)
      font-weight bold
      text-align center
      margin-top 0.4rem
      line-height 0.88rem
</style>
