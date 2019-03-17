<template>
  <div style="margin-bottom: 1.11rem; background: white" ref="wrapper">
    <navi :detailTitle="detailTitle"></navi>
    <div class="back iconfont" @click="$router.go(-1)">&#xe671;</div>
    <swiper :imgs="data.pic_list"></swiper>
    <div>
      <title-model :data="data"></title-model>
      <secondHandInfor :data="data"></secondHandInfor>
      <features :title="title" :data="data"></features>
      <report :type="5" :id="data.id"></report>
      <secondRecommend v-if="recommendList.length != 0" :data="recommendList" @reloadView="reloadDetail"></secondRecommend>
    </div>
    <foot-view :isshoucang="data.isshoucang" :type="5" :id="data.id" :phone="data.phone" @reloadView="isShoucangReload"></foot-view>
  </div>
</template>

<script>
  import navi from '../components/detailNav'
  import Swiper from '../components/detailSwipe'
  import TitleModel from '../components/secondModel'
  import secondHandInfor from '../components/secondHandInfor'
  import Features from '../components/carFeatures'
  import Report from '../components/report'
  import FootView from '../components/footView'
  import secondRecommend from '../components/secondRecommend'
  import BScroll from 'better-scroll'

  export default {
    name: "",
    data() {
      return {
        data: {},
        recommendList: [],
        detailTitle: '二手交易',
        title: '详细情况'
      }
    },
    components: {
      navi,
      Swiper,
      TitleModel,
      secondHandInfor,
      Features,
      Report,
      secondRecommend,
      FootView
    },
    created() {
      this.getSecondHandrecommend()
    },
    mounted() {
      this.scroll=new  BScroll(this.$refs.wrapper,{click:true})
      this.getSecondHandDetail(this.$route.query.id)
    },
    methods: {
      getSecondHandDetail(id) {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_news',
            weid: this.$store.state.weid,
            type: '5',
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
      getSecondHandrecommend() {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_referrer',
            districtid: this.$store.state.weid,
            type: '5',
            psize: '2'
          },
        }).then(res => {
          if (res.data.code === '200') {
            console.log(res.data)
            this.recommendList = res.data.datas
          }
        }).catch(err => {

        })
      },
      reloadDetail(id) {
        this.getSecondHandDetail(id)
        this.scroll.scrollTo(0, 0)
      },
      isShoucangReload() {
        this.getSecondHandDetail(this.$route.query.id)
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
