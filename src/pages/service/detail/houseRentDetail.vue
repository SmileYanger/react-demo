<template>
  <div ref="wrapper" style="margin-bottom: 1.11rem; background: white">
    <navi :detailTitle="detailTitle"></navi>
    <div class="back iconfont" @click="$router.go(-1)">&#xe671;</div>
    <swiper :imgs="data.pic_list"></swiper>
    <div>
      <title-model :data="data"></title-model>
      <detail-type :data="data"></detail-type>
      <information :data="data"></information>
      <features :data="data"></features>
      <house-configuration :data="data"></house-configuration>
      <a-map v-if="data.longs != undefined" :data="data"></a-map>
      <report :type="2" :id="data.id"></report>
      <similar v-if="recommendList.length != 0" :type="2" :data="recommendList" @reloadView="reloadDetail"></similar>
    </div>
    <foot-view :isshoucang="data.isshoucang" :type="2" :id="data.id" :phone="data.phone" @reloadView="isShoucangReload"></foot-view>
  </div>
</template>

<script>
  import navi from '../components/detailNav'
  import Swiper from '../components/detailSwipe'
  import TitleModel from '../components/detailTitel'
  import DetailType from '../components/houseRentDetailType'
  import Information from '../components/rentInformation'
  import Features from '../components/features'
  import HouseConfiguration from '../components/HouseConfiguration'
  import AMap from '../components/map'
  import Report from '../components/report'
  import FootView from '../components/footView'
  import Similar from '../components/similar'
  import BScroll from 'better-scroll'

  export default {
    name: "",
    components: {
      navi,
      Swiper,
      TitleModel,
      DetailType,
      Information,
      Features,
      HouseConfiguration,
      AMap,
      Report,
      Similar,
      FootView
    },
    data() {
      return {
        data: {},
        id: this.$route.query.id,
        recommendList: [],
        detailTitle: '房屋出租'
      }
    },
    mounted() {
      this.scroll=new  BScroll(this.$refs.wrapper,{click:true})
      this.getHouseRentDetail(this.id)
      this.getHouseRentrecommend()
    },
    methods: {
      getHouseRentDetail(id) {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_news',
            weid: this.$store.state.weid,
            type: '2',
            openid: this.$store.state.openid,
            id: id
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.data = res.data.datas
          }
        }).catch(err => {

        })
      },
      getHouseRentrecommend() {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_referrer',
            districtid: this.$store.state.weid,
            type: '2',
            psize: '2'
          },
        }).then(res => {
          if (res.data.code === '200') {
            this.recommendList = res.data.datas
          }
        }).catch(err => {

        })
      },
      reloadDetail(id) {
        this.getHouseRentDetail(id)
        this.scroll.scrollTo(0, 0)
      },
      isShoucangReload() {
        this.getHouseRentDetail(this.$route.query.id)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .back
    color #fff
    background rgba(0, 0, 0, 0.5)
    width 40px
    height 40px
    text-align center
    line-height 40px
    font-size 20px
    border-radius 50%
    position absolute
    top 0.5rem
    left 0.35rem
    z-index 2
</style>
