<template>
  <div class="header-input">
    <span class="iconfont">&#xe6c6;</span>
    <input class="search" type="text" placeholder="请输入搜索信息" name="" @click='goSearch'>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        value: ''
      }
    },
    methods:{
      goSearch(){
        this.$router.push('./homesearch')
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .header-input
    width 70%
    margin 0 auto
    font-size 0.26rem
    color rgb(153, 153, 153)
    height 0.6rem
    line-height 0.6rem
    border-radius 0.3rem
    background rgba(255,255,255,0.6)
    position absolute
    top 0.48rem
    left 15%
    z-index 5
    .iconfont
      margin-left 0.3rem
    .search
      height 0.6rem
      vertical-align top
      background transparent
</style>
