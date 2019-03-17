<template>
  <div class="recruitmentMessage">
    <div class="recruitment_title">
      <div class="div">
        <span class="name">{{data.title}}</span>
      </div>
      <div class="browse">
        <i class="iconfont">&#xebcc;</i>{{data.yuedu}}浏览
      </div>
    </div>
    <div class="money">{{data.gongzi}}</span></div>
    <div class="label_">
      <span class="address">{{data.gongzuo}}</span>
      <span class="jobexp">{{data.jobexp}}</span>
      <span class="education">{{data.xueli}}</span>
    </div>
    <div class="claim">
      <span>职位：</span>
      <span style="color: rgb(51,51,51)">{{data.zhiwei}}</span>
    </div>
    <div class="claim">
      <span>要求：</span>
      <span style="color: rgb(51,51,51)">{{data.renshu}}</span>
    </div>
    <div class="claim">
      <span>福利：</span>
      <span style="color: rgb(51,51,51)">{{welfares}}</span>
    </div>
    <div class="claim">
      <span>时间：</span>
      <span style="color: rgb(51,51,51)">{{data.time}}</span>
    </div>
    <div class="gongsi_message">
      <div class="gongsi">{{data.qiye}}</div>
      <div class="didian">
        <div>
          <i class="iconfont">&#xe609;</i>
          {{data.address}}
        </div>
        <i class="iconfont xiangyou" style="font-size: 0.32rem; color: #666">&#xe666;</i>
      </div>
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
    },
    computed: {
      welfares: function () {
        var welfareStr = []
        for (var i in this.data.welfare) {
          welfareStr.push(this.data.welfare[i])
        }
        return welfareStr.join('、')
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .recruitmentMessage
    margin-top 1.29rem
    padding 0.25rem
    background #fff
    border-bottom 0.2rem solid rgb(238, 238, 238)
    .recruitment_title
      display flex
      justify-content space-between
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
    .money
      font-size 0.32rem
      color red
      margin 0.15rem 0
      font-weight bold
    .label_
      color rgb(88, 124, 172)
      font-size 0.2rem
      margin 0.15rem 0
      span
        display inline-block
        background-color rgb(244, 247, 251)
        padding 0 0.1rem
        margin-right 0.1rem
    .claim
      color rgb(133, 133, 133)
      font-size 0.28rem
      margin 0.15rem 0
    .gongsi_message
      border-top 1px solid rgb(242,242,242)
      padding-top 0.15rem
      .gongsi
        font-size 0.28rem
        font-weight bold
      .didian
        font-size 0.26rem
        color #666
        display flex
        justify-content space-between
        .iconfont
          color dodgerblue
</style>
