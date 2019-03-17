<template>
  <div>
    <div class="navi">
      <div class="iconfont" @click="$router.go(-1)">&#xe671;</div>
      <div class="carpoolTitle">拼车详情</div>
    </div>
    <div class="car_item">
      <div class="car_title">
        <div class="left">
          <span class="name">{{data.linkman}}</span>
          <span class="seat">{{data.vehicle}} <span v-if="data.vehicle != null" class="point"></span> 空余{{data.number}}座位</span>
        </div>
        <div class="browse">
          <i class="iconfont">&#xebcc;</i>{{data.page_view}}浏览
        </div>
      </div>
      <div class="cost" v-if="data.cost != null">
        {{data.cost}}
        <span style="font-size: 0.2rem">元/人</span>
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
    </div>
    <carpool-detail :data="data"></carpool-detail>
    <report :type="7" :id="data.id" style="background: #fff"></report>
    <foot-view :isshoucang="data.isshoucang" :type="7" :id="data.id" :phone="data.phone" @reloadView="isShoucangReload"></foot-view>
  </div>
</template>

<script>
  import CarpoolDetail from '../components/carpoolDetail'
  import Report from '../components/report'
  import FootView from '../components/footView'

  export default {
    name: "",
    data() {
      return {
        data: {}
      }
    },
    components: {
      CarpoolDetail,
      Report,
      FootView
    },
    methods: {
      getCarpoolDetail() {
        this.$axios({
          method: 'post',
          data: {
            do: 'car_details',
            act: 'details',
            openid: this.$store.state.openid,
            id: this.$route.query.id
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.data = res.data.datas
          }
        }).catch(err => {

        })
      },
      isShoucangReload() {
        this.getCarpoolDetail()
      }
    },
    created() {
      this.getCarpoolDetail()
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .navi
    position fixed
    top 0
    left 0
    height 1.28rem
    width 100%
    background rgb(238, 238, 238)
    border-bottom 1px solid rgb(230, 230, 230)
    .iconfont
      position absolute
      left 0.25rem
      top 0.64rem
    .carpoolTitle
      font-size 0.36rem
      color rgb(51, 51, 51)
      font-weight bold
      text-align center
      margin-top 0.4rem
      line-height 0.88rem

  .car_item
    margin-top 1.29rem
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background #fff
    padding 0.25rem
    .car_title
      display flex
      justify-content space-between
      .left
        .name
          font-size 0.3rem
          color rgb(51, 51, 51)
          font-weight 600
          margin-right 0.25rem
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
      .browse
        color rgb(187,187,187)
        font-size 0.24rem
        .iconfont
          margin-right 0.1rem
          position relative
          top 2px
          font-size 0.36rem
    .cost
      font-size 0.4rem
      color rgb(255,29,0)
      margin-top 0.2rem
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
</style>
