<template>
  <div class="listView">
    <div class="item" @click="handleClickDetail(data.id)">
      <div class="item_4">
        <div class="title2">
          <span class="name">{{data.linkman}}</span>
          <span class="seat">{{data.vehicle}} <span v-if="data.vehicle != null" class="point"></span> 空余{{data.number}}座位</span>
        </div>
        <div class="time">
          <img src="../../../assets/images/fuwu/shijian.png" alt="">
          <span>{{data.go_time}}</span>
        </div>
        <div class="zong">
          <img src="../../../assets/images/fuwu/icon.png" alt="">
          <div class="startAddress">{{data.start}}</div>
          <div class="halfway">{{data.pass}}</div>
          <div class="endAddress">{{data.bourn}}</div>
        </div>

        <div class="call_phone">
          <img src="../../../assets/images/phone.png" alt="">
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
      handleClickDetail(id) {
        this.$router.push({
          path: './Carpool',
          query: {
          id: id
        }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .listView
    background-color #fff
    .item_4
      margin 0 0.25rem
      padding-top 0.35rem
      border-bottom 1px solid #eaeaea
      position relative
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
      .time
        margin-top 0.2rem
        img
          width 0.54rem
          margin-right 0.2rem
        span
          color rgb(102, 102, 102)
          font-size 0.22rem
      .zong
        position relative
        margin 0.35rem 0 0.2rem
        color rgb(102, 102, 102)
        font-size 0.22rem
        img
          width 0.54rem
        .startAddress
          position absolute
          top 0.1rem
          left 0.8rem
        .halfway
          position absolute
          top 1rem
          left 0.8rem
        .endAddress
          position absolute
          top 2rem
          left 0.8rem
      .call_phone
        width 0.82rem
        height 0.82rem
        border-radius 50%
        background-color rgb(244, 247, 251)
        position absolute
        top 0.5rem
        right 0
        overflow hidden
        img
          width 100%
</style>
