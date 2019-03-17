<template>
  <div class="box">
    <header-bar :title="title"></header-bar>
    <div style="padding-top: 1.29rem">
      <tab :line-width=2 active-color='red' v-model="index">
        <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @click.native="HandelActivityBtn(index)"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <div>
        <swiper v-model="index" :show-dots="false">
          <swiper-item v-for="(item, index) in list" :key="index">
            <div class="content">
              <div v-if="index === 0">
                <zixun-list :listData="zixunList"></zixun-list>
                <div class="shouchang" v-if="zixunList.length == 0">
                  <img class="wushoucang" src="../../../assets/images/shoucang.png" alt="">
                  <div>
                    目前无收藏
                  </div>
                </div>
              </div>
              <div v-if="index === 1">
                <activities-item  v-for="(item1, index1) in huodongList" :key="index1" :data="item1"></activities-item>
                <div class="shouchang" v-if="huodongList.length == 0">
                  <img class="wushoucang" src="../../../assets/images/shoucang.png" alt="">
                  <div>
                    目前无收藏
                  </div>
                </div>
              </div>
              <div v-if="index === 2">
                <service-list  v-for="(item2, index2) in fuwuList" :key="index2" :data="item2"></service-list>
                <div class="shouchang" v-if="fuwuList.length == 0">
                  <img class="wushoucang" src="../../../assets/images/shoucang.png" alt="">
                  <div>
                    目前无收藏
                  </div>
                </div>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import TabSwiper from 'common/tabSwiper'
  import HeaderBar from 'common/headerbar'
  import zixunList from 'common/List'
  import ActivitiesItem from '../components/activitiesItem'
  import serviceList from '../../service/components/list'

  export default {
    components: {
      HeaderBar,
      TabSwiper,
      zixunList,
      ActivitiesItem,
      serviceList
    },
    data() {
      return {
        title: '我的收藏',
        list: ['资讯', '活动', '服务'],
        selected: '资讯',
        index: 0,
        zixunList: [],
        huodongList: [],
        fuwuList: []
      }
    },
    methods: {
      Goback() {
        this.$router.push('/')
      },
      HandelActivityBtn(index) {
        if (index == 0) {
          this.getZixunInfo()
        }
        if (index == 1) {
          this.getHuodongInfo()
        }
        if (index == 2) {
          this.getFuwuInfo()
        }
      },
      getZixunInfo() {
        this.$axios({
          method: 'post',
          data: {
            do: 'sc_srect',
            act: 'Zhixun',
            page: '1',
            psize: '5',
            openid: this.$store.state.openid,
            weid: this.$store.state.weid,
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.zixunList = res.data.datas
          }
        }).catch(err => {
          console.log(err)
        })
      },

      getHuodongInfo() {
        this.$axios({
          method: 'post',
          data: {
            do: 'sc_srect',
            act: 'huodong',
            page: '1',
            psize: '5',
            openid: this.$store.state.openid,
            weid: this.$store.state.weid
          },
        }).then(res => {
          if (res.data.code === '200') {
            this.huodongList = res.data.datas
          }
        })
      },
      getFuwuInfo() {
        this.$axios({
          method: 'post',
          data: {
            do: 'sc_srect',
            act: 'Xinxi',
            page: '1',
            psize: '5',
            openid: this.$store.state.openid,
            weid: this.$store.state.weid
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.fuwuList = res.data.datas
          }
        })
      }
    },
    created() {
      this.getZixunInfo()
      this.getHuodongInfo()
      this.getFuwuInfo()
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
      .shouchang
        text-align center
        color #999999
        .wushoucang
          margin 1.5rem auto 0.5rem
</style>
