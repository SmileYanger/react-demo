<template>
  <div class="box">
    <header-bar :title="title"></header-bar>
    <div v-if="datas.length > 0" style="padding-top: 1.29rem">
      <tab :line-width=2 active-color='red' v-model="index">
        <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in lists"
                  @click.native="HandelActivityBtn(index)"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false">
        <swiper-item v-for="(item, index) in lists" :key="index">
          <div class="content vux-center">
            <div v-for="(item1, index1) in datas" :key="index1">
              <activities-item :data="item1"></activities-item>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="huodong" v-else>
      <img class="wuhuodong" src="../../../assets/images/huodong.png" alt="">
      <div>还没有任何活动</div>
    </div>
  </div>
</template>

<script>
  import TabSwiper from 'common/tabSwiper'
  import HeaderBar from 'common/headerbar'
  import ActivitiesItem from '../components/activitiesItem'

  export default {
    components: {
      HeaderBar,
      TabSwiper,
      ActivitiesItem
    },
    data() {
      return {
        title: '我的活动',
        lists: ['全部', '待参加', '已完成'],
        selected: '全部',
        index: 0,
        datas: []
      }
    },
    methods: {
      HandelActivityBtn(index) {
        var act = ''
        if (index == 0) {
          act = 'quan'
        }
        if (index == 1) {
          act = 'dai'
        }
        if (index == 2) {
          act = 'wan'
        }
        this.getMyActivity(act)
      },
      Goback() {
        this.$router.push('/')
      },
      getMyActivity(act) {
        this.$axios({
          method: 'post',
          data: {
            do: 'wo_huodong',
            act: act,
            page: '1',
            psize: '5',
            openid: this.$store.state.openid,
            weid: this.$store.state.weid
          },
        }).then(res => {
          this.datas = []
          if (res.data.code === '200') {
            this.datas = res.data.datas
          }
        })
      }
    },
    created() {
      this.getMyActivity('quan')
    }
  }
</script>

<style lang="stylus" scoped type="text/stylus">
  .box >>> .scrollable .vux-tab-item
    position relative
  .box >>> .vux-tab-selected
    color rgb(232, 26, 0)!important
  .box >>>.vux-tab-ink-bar
    background-color rgb(232, 26, 0)!important
    width .5rem!important
    margin 3px auto 0
    position absolute
    z-index 99
    bottom .1rem !important
  .box >>> .vux-slider ,
  .box >>> .vux-slider > .vux-swiper
    overflow visible!important
  .box >>> .vux-tab-item
    background-image none !important
    color rgb(133,133,133) !important
  .box >>> .vux-swiper
    height 100%
    background-color #f6f6f6
    flex none
    display block
    flex 1
    width 100%
    height 100%
  .box
  //
    .content
      height 8rem
      background-color white
      box-sizing border-box
      margin-top .2rem

    .huodong
      text-align center
      color #999999
      .wuhuodong
        margin 2rem auto 0.5rem
</style>
