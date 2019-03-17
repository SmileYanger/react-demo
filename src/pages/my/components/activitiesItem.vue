<template>
  <div class="list_view">
    <div class="item">
      <div v-if="data.cha">
        <div class="title" v-if="data.cha === '已完成'">
          <span class="yuan"></span>
          <span class="style">{{data.cha}}</span>
        </div>
        <div class="title1" v-else>
          <span class="yuan1"></span>
          <span class="style1">{{data.cha}}</span>
        </div>
      </div>
      <div class="item1">
        <div class="list_img">
          <img :src="data.thumb | url" alt="">
        </div>
        <div class="list_right">
          <p class="list_titele">
            {{data.name}}
          </p>
          <div class="address">
            <i class="iconfont">&#xe609;</i>
            <span>{{data.address}}</span>
          </div>
          <div class="last">
            <span class="time">{{data.time}}</span>
            <span class="money">￥{{data.feiyong}}</span>
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
    created() {
      console.log(this.data)
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"

  .list_view
    background #fff
    .item
      border-bottom 1px solid #eaeaea
      .title
        padding 0.15rem 0.25rem 0 0.25rem
        span
          display inline-block
          color #999
        .yuan
          width 10px
          height 10px
          border-radius 50%
          background #999
          margin-right 0.1rem
      .title1
        padding 0.15rem 0.25rem 0 0.25rem
        span
          display inline-block
          color red
        .yuan1
          width 10px
          height 10px
          border-radius 50%
          background red
          margin-right 0.1rem
      .item1
        display flex
        justify-content space-between
        padding 0.15rem 0.25rem
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
            font-size 0.28rem
            color rgb(51, 51, 51)
            font-weight 600
          .address
            font-size 0.2rem
            color rgb(102, 102, 102)
            margin-top 0.18rem
          .last
            margin-top 0.18rem
            display flex
            justify-content space-between
            .money
              font-size 0.32rem
              color rgb(255, 29, 0)
            .time
              font-size 0.2rem
              color rgb(51, 51, 51)

</style>
