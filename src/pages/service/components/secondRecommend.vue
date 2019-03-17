<template>
  <div class="similar">
    <div class="similarTitle">
      相似推荐
    </div>
    <div v-for="(item, index) in data" :key="index">
      <div class="item" @click="handleClickDetail(item.id)">
        <div class="list_img">
          <img :src="item.pic" alt="">
        </div>
        <div class="list_right">
          <div class="list_titele">{{item.title}}</div>
          <div class="subtitle">
            <span>{{item.address}}</span>
            <span>{{item.xinjiu}}</span>
          </div>
          <div class="last">
            <span class="money">{{item.jiage}}<span style="font-size: 0.2rem">元</span></span>
            <span class="time">{{item.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      data: {
        type: Array
      },
      type: {
        type: Number
      }
    },
    methods: {
      handleClickDetail(id) {
        this.$emit('reloadView', id)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"

  .similar
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    .similarTitle
      font-size 0.3rem
      color rgb(51, 51, 51)
      font-weight bold
      margin-left 0.25rem
      margin-top 0.35rem
    .item
      margin 0 0.25rem
      display flex
      justify-content space-between
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
