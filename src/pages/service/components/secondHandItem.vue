<template>
  <div class="listView">
    <div class="item" @click="handleClickDetail()">
      <div class="item_second">
        <div class="list_img">
          <img :src="data.pic" alt="">
        </div>
        <div class="list_right">
          <div class="list_titele">
            {{data.title}}
          </div>
          <div class="address">
            <span>{{data.address}}</span>
          </div>
          <div class="label">
            <span>{{data.xinjiu}}</span>
          </div>
          <div class="last">
            <span class="money" v-if="data.jiage === '0'">面议</span>
            <span class="money" v-else>{{data.jiage}}<span style="font-size: 0.2rem"> 元</span></span>
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
          path: './secondHandDetail',
          query: {
            id: this.data.id
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"

  .listView
    background-color #fff
    .item_second
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
        margin 0.3rem 0
        position relative
        margin-left 0.2rem
        .list_titele
          font-size 0.3rem
          color rgb(51, 51, 51)
          font-weight 600
          ellipsis()
        .address
          font-size 0.22rem
          color rgb(102, 102, 102)
        .label
          color rgb(88, 124, 172)
          font-size 0.2rem
          margin 0.1rem 0
          span
            display inline-block
            background-color rgb(244, 247, 251)
            padding 0.05rem 0.1rem
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
</style>
