<template>
  <div class="listView">
    <div v-for="(item, index) in data" :key="index" @click="handleClickDetail()">
      <div class="item_2">
        <div class="title1">
          <span>{{item.zhiwei}}</span>
          <span class="money">{{item.gongzi}}</span>
        </div>
        <div class="label" v-if="item.welfare.length > 0">
          <span v-for="(item1, index1) in item.welfare">{{item.welfare[index1]}}</span>
        </div>
        <div class="lastView">
          <span class="address">{{item.qiye}}</span>
          <span class="time">{{item.time}}</span>
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
        type: Array
      }
    },
    methods: {
      handleClickDetail() {
        this.$router.push({
          path: './recruitmentDetail',
          query: {
            id: this.data.id
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .listView
    background-color #fff
    border-bottom 0.2rem solid #eaeaea
    .item_2
      margin 0rem 0.25rem
      padding-top 0.35rem
      border-bottom 1px solid #eaeaea
      .title1
        font-size 0.3rem
        color rgb(51, 51, 51)
        display flex
        justify-content space-between
        font-weight 600
        .money
          font-size 0.32rem
          color rgb(255, 29, 0)
      .label
        color rgb(88, 124, 172)
        font-size 0.2rem
        margin 0.2rem 0
        span
          display inline-block
          background-color rgb(244, 247, 251)
          padding 0.05rem 0.1rem
          margin-right 0.1rem
      .lastView
        display flex
        justify-content space-between
        color rgb(178, 178, 178)
        margin-top 0.2rem
        margin-bottom 0.35rem
        .address
          font-size 0.22rem
        .time
          font-size 0.2rem
</style>
