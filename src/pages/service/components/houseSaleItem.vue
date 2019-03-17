<template>
  <div class="listView">
    <div class="item" @click="handleClickDetail()">
      <div class="item_1">
        <div class="list_img">
          <img :src="data.pic" alt="">
        </div>
        <div class="list_right">
          <div class="list_titele">
            {{data.title}}
          </div>
          <div class="subtitle">
            <span>{{data.huxing}} {{data.mianji}}㎡</span>
            <span>{{data.orientation}}</span>
            <span>{{data.louceng_1}}(共{{data.louceng_2}})</span>
          </div>
          <div class="last">
            <span class="money">{{data.jiage}}<span style="font-size: 0.2rem"> 万</span></span>
            <span class="time">{{data.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      handleClickDetail() {
        this.$router.push({
          path: './houseSaleDetail',
          query: {
            id: this.data.id
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"

  .listView
    background-color #fff
    .item_1
      display flex
      justify-content space-between
      margin 0 0.25rem
      border-bottom 1px solid #eaeaea
      .list_img
        width 2.2rem
        height 1.6rem
        margin 0.35rem 0
        img
          width 2.2rem
          height 1.6rem
      .list_right
        width calc(100% - 2.4rem)
        height 1.6rem
        margin-top 0.35rem
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
          margin-top 0.2rem
        .last
          margin-top 0.2rem
          display flex
          justify-content space-between
          .money
            font-size 0.32rem
            color rgb(255, 29, 0)
          .time
            font-size 0.2rem
            color rgb(178, 178, 178)
</style>
