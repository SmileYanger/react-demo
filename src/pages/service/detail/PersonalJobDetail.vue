<template>
  <div style="margin-bottom: 1.11rem; background: white" ref="wrapper">
    <div class="navi">
      <div class="iconfont" @click="$router.go(-1)">&#xe671;</div>
      <div class="jobTitle">个人求职</div>
    </div>
    <personal-message :data="data"></personal-message>
    <experience :data="data"></experience>
    <education-experience :data="data"></education-experience>
    <div class="self_evaluation">
      <div class="self">自我评价</div>
      <div class="evaluation">{{data.body}}</div>
    </div>
    <Report :type="4" :id="data.id"></Report>
    <recommend v-if="recommendList.length != 0" :data="recommendList" @reloadView="reloadDetail"></recommend>
    <foot-view :isshoucang="data.isshoucang" :type="4" :id="data.id" :phone="data.phone" @reloadView="isShoucangReload"></foot-view>
  </div>
</template>

<script>
  import personalMessage from '../components/personalMessage'
  import experience from '../components/experience'
  import educationExperience from '../components/educationExperience'
  import Report from '../components/report'
  import Recommend from '../components/recommend'
  import FootView from '../components/footView'
  import BScroll from 'better-scroll'

  export default {
    name: "",
    data() {
      return {
        data: {},
        recommendList: []
      }
    },
    components: {
      personalMessage,
      experience,
      educationExperience,
      Report,
      Recommend,
      FootView
    },
    created() {
      this.getPersonalrecommend()
    },
    mounted() {
      this.scroll=new  BScroll(this.$refs.wrapper,{click:true})
      this.getJobDetail(this.$route.query.id)
    },
    methods: {
      getJobDetail(id) {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_news',
            weid: 2,
            type: '4',
            openid: this.$store.state.openid,
            id: '526'
          },
        }).then(res => {
          if (res.data.code === '200') {
            this.data = res.data.datas
          }
        }).catch(err => {

        })
      },
      getPersonalrecommend() {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_referrer',
            districtid: this.$store.state.weid,
            type: '4',
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
        this.getJobDetail(id)
        this.scroll.scrollTo(0, 0)
      },
      isShoucangReload() {
        this.getJobDetail(this.$route.query.id)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
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
    .jobTitle
      font-size 0.36rem
      color rgb(51, 51, 51)
      font-weight bold
      text-align center
      margin-top 0.4rem
      line-height 0.88rem
  .self_evaluation
    background #fff
    padding 0.25rem
    border-bottom 0.2rem solid rgb(238, 238, 238)
    .self
      font-size 0.36rem
      color rgb(51, 51, 51)
    .evaluation
      margin 0.1rem 0
      font-size 0.26rem
      color rgb(133,133,133)
</style>
