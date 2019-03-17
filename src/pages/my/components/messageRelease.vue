<template>
  <div class="list_view">
    <div class="item">
      <div class="item_1" v-if="list.id == 1">
        <div class="list_img">
          <img src="../../../assets/images/home/list.png" alt="">
        </div>
        <div class="list_right">
          <div class="list_titele">
            好房源高品质别墅小区花园洋房
          </div>
          <div class="subtitle">
            <span>三室两厅两卫</span>
            <span>南北</span>
            <span>高层(共10层)</span>
          </div>
          <div class="count">浏览239次</div>
          <div class="last">
            <span class="money">350<span style="font-size: 0.2rem"> 万</span></span>
            <span class="time">15分钟前</span>
          </div>
        </div>
      </div>
      <div class="item_2" v-if="list.id == 2">
        <div class="title1">
          <span>前台收银</span>
          <span class="money">1500<span style="font-size: 0.2rem"> 元/月</span></span>
        </div>
        <div class="claim">
          <span>2人</span>
          <span>全职</span>
          <span>大专及本科</span>
        </div>
        <div class="lastView">
          <span class="count">浏览239次</span>
          <span class="time">1小时前</span>
        </div>
      </div>
      <div class="item_3" v-if="list.id == 3">
        <div class="title2">
          <span class="name">车主信息</span>
          <span class="seat">轿车 <span class="point"></span> 空余4座位</span>
          <div class="release_time">发布于16:42</div>
        </div>
        <div class="time">
          <i class="iconfont">&#xe6c6;</i>
          <span>2018-08-22 18:00</span>
        </div>
        <div class="startAddress">
          <i class="iconfont">&#xe6c6;</i>
          <span>西北大学（长安校区）</span>
        </div>
        <div class="endAddress">
          <i class="iconfont">&#xe6c6;</i>
          <span>西安绿地假日酒店（西安市雁塔区）</span>
        </div>
      </div>
    </div>
    <div class="btns">
      <div>刷新</div>
      <div>编辑</div>
      <div>删除</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'List',
    data() {
      return {
        list: this.item
      }
    },
    props: {
      item: Object
    },
    methods: {}
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"
  .list_view
    background #fff
    border-bottom 0.2rem solid #f6f6f6
    .item
      padding 0.3rem 0.2rem 0 0.2rem
      .item_1
        display flex
        justify-content space-between
        border-bottom 1px solid #eaeaea
        padding-bottom 0.25rem
        .list_img
          width 2.2rem
          height 1.6rem
          img
            width 2.2rem
            height 1.6rem
        .list_right
          width 5rem
          text-align left
          position relative
          overflow hidden
          margin-left 0.2rem
          .list_titele
            font-size 0.3rem
            color rgb(51, 51, 51)
            font-weight 600
            ellipsis()
          .subtitle
            font-size 0.22rem
            color rgb(102, 102, 102)
            margin-top 0.1rem
          .count
            margin-top 0.1rem
            font-size 0.2rem
            color rgb(178, 178, 178)
          .last
            margin-top 0.1rem
            display flex
            justify-content space-between
            .money
              font-size 0.32rem
              color rgb(255, 29, 0)
            .time
              font-size 0.2rem
              color rgb(178, 178, 178)
      .item_2
        border-bottom 1px solid #eaeaea
        padding-bottom 0.25rem
        .title1
          font-size 0.3rem
          color rgb(51, 51, 51)
          display flex
          justify-content space-between
          font-weight bold
          .money
            font-size 0.32rem
            color rgb(255, 29, 0)
        .claim
          color rgb(102, 102, 102)
          font-size 0.2rem
          margin 0.1rem 0
          span
            margin-right 0.2rem
        .lastView
          display flex
          justify-content space-between
          color rgb(178, 178, 178)
          .count
            font-size 0.2rem
          .time
            font-size 0.2rem
      .item_3
        border-bottom 1px solid #eaeaea
        padding-bottom 0.25rem
        .title2
          .name
            font-size 0.3rem
            color rgb(51, 51, 51)
            font-weight 600
            margin-right 0.2rem
          .seat
            display inline-block
            background-color rgb(244, 247, 251)
            padding 0.05rem 0.1rem
            font-size 0.2rem
            color rgb(88, 124, 172)
          .point
            display inline-block
            width 0.04rem
            height 0.04rem
            background-color rgb(88, 124, 172)
            position relative
            top -0.02rem
            margin 0 0.1rem
          .release_time
            float right
            font-size 0.2rem
            color rgb(178, 178, 178)
        .time
          margin-top 0.1rem
          i
            margin-right 0.2rem
          span
            color rgb(102, 102, 102)
            font-size 0.22rem
        .startAddress
          margin-top 0.1rem
          i
            margin-right 0.2rem
          span
            color rgb(102, 102, 102)
            font-size 0.22rem
        .endAddress
          margin-top 0.1rem
          i
            margin-right 0.2rem
          span
            color rgb(102, 102, 102)
            font-size 0.22rem
    .btns
      display flex
      justify-content flex-end
      padding 0 0.2rem
      height 0.85rem
      div
        color rgb(57, 130, 247)
        font-size 0.24rem
        border 0.01rem solid rgb(57, 130, 247)
        height 0.44rem
        line-height 0.44rem
        width 0.92rem
        text-align center
        margin 0.2rem 0.2rem 0.2rem 0
        border-radius 0.1rem
</style>
