<template>
  <div class="listView">
    <div class="item" @click="handleClickDetail()">
      <div class="item_3">
        <div class="car_title">{{data.title}}</div>
        <div class="Introduction">
          <div class="money_year">
            <span class="money">{{data.jiage}}<span style="font-size: 0.2rem">万</span></span>
            <span>{{data.card_time}} | {{data.mileage}}</span>
          </div>
          <span class="time">{{data.time}}</span>
        </div>
        <div class="imgs" v-if="data.pic.length != 0">
          <div class="img" v-for="(item, index) in data.pic" :key="index">
            <img :src="data.pic[index]" alt="">
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
          path: './carDetail',
          query: {
            id: this.data.id
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .listView
    background-color #fff
    .item_3
      margin 0 0.25rem
      padding 0.25rem 0 0.15rem
      border-bottom 1px solid #eaeaea
      .car_title
        font-size 0.3rem
        color rgb(51, 51, 51)
        font-weight 600
      .Introduction
        display flex
        justify-content space-between
        font-size 0.2rem
        color rgb(178, 178, 178)
        margin-top 0.2rem
        .money
          font-size 0.32rem
          color rgb(255, 29, 0)
        span
          margin-right 0.1rem
      .imgs
        display flex
        justify-content flex-start
        margin 0.25rem 0
        .img
          width 2.26rem
          overflow hidden
          margin-right 0.1rem
          img
            width 100%
            height 100%
</style>
