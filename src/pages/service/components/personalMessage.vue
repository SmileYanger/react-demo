<template>
  <div class="personalMessage">
    <div class="personal_title">
      <div class="div">
        <span class="name">{{data.name}}</span>
      </div>
      <div class="browse">
        <i class="iconfont">&#xebcc;</i>{{data.yuedu}}浏览
      </div>
    </div>
    <div class="label">
      <span class="sex" v-if="data.sex != ''">{{data.sex}}</span>
      <span class="age" v-if="data.age != ''">{{data.age}}</span>
      <!--<span class="work_year"></span>-->
      <span class="education" v-if="data.xueli != ''">{{data.xueli}}</span>
    </div>
    <div class="claim">
      <span>期望薪资：</span>
      <span style="color: rgb(255,29,0)">{{data.gongzi}}</span>
    </div>
    <div class="claim">
      <span>期望职位：</span>
      <span style="color: rgb(51,51,51)">{{data.zhiwei}}</span>
    </div>
    <div class="claim">
      <!--<span>期望地点：</span>-->
      <!--<span style="color: rgb(51,51,51)">西安</span>-->
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
  .personalMessage
    margin-top 1.29rem
    padding 0.25rem
    background #fff
    border-bottom 0.2rem solid rgb(238, 238, 238)
    .personal_title
      display flex
      justify-content space-between
      margin-top 0.1rem
      .div
        span
          display inline-block
          color rgb(133, 133, 133)
          font-size 0.24rem
          margin-right 5px
        .name
          font-size 0.32rem
          font-weight bold
          color rgb(51, 51, 51)
        .age
          height 0.24rem
          line-height 0.24rem
          padding-left 6px
          border-left 1px solid rgb(133, 133, 133)
        .work_year
          height 0.24rem
          line-height 0.24rem
          padding-left 6px
          border-left 1px solid rgb(133, 133, 133)
        .education
          height 0.24rem
          line-height 0.24rem
          padding-left 6px
          border-left 1px solid rgb(133, 133, 133)
      .browse
        color rgb(133, 133, 133)
        font-size 0.24rem
        .iconfont
          margin-right 0.1rem
          position relative
          top 2px
          font-size 0.36rem
    .label
      color rgb(88, 124, 172)
      font-size 0.2rem
      margin 0.2rem 0
      span
        margin-right 0.1rem
    .claim
      color rgb(133, 133, 133)
      font-size 0.28rem
      margin 0.2rem 0
</style>
