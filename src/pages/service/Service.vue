<template>
  <div class="wapper">
    <!-- 搜索 -->
    <search></search>
    <!-- 轮播 -->
    <swiper :bannerImg="bannerImg"></swiper>
    <div class="hot">
      <img class="laba" src="../../assets/images/fuwu/laba.png" alt="">
      <div class="scroll">
        <hot-scroll></hot-scroll>
      </div>
    </div>
    <scroll></scroll>
    <tabbar></tabbar>
    <release v-show="showModel"></release>
  </div>
</template>

<script>
  import Search from './components/search'
  import Swiper from 'common/Carousel'
  import Scroll from './components/scrollTab'
  import Tabbar from 'common/Tabbar'
  import HotScroll from 'common/HotScroll'
  import Release from '@/pages/release/Release'

  export default {

    name: 'Service',
    components: {
      Search,
      Swiper,
      Scroll,
      Tabbar,
      HotScroll,
      Release
    },
    data() {
      return {
        showModel: '',
        bannerImg: [],
      }
    },
    created() {
      this.getBnnerImg()
    },
    methods: {
      // 获取banner数据
      async getBnnerImg() {
        const {data: res} = await this.$axios({
          method: 'post',
          data: {
            do: 'xinxi_refer',
            act: 'swiper',
            weid: '103'
          }
        })
        if (res.code !== '200') return console.log("请求数据失败");
        this.bannerImg = res.datas
      }
    },
    mounted: function () {
      var _this = this
      this.bus.$on('', function (value) {
        _this.showModel = value
      })
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .wapper
    margin-bottom 1.3rem
    position relative
    background-color #f6f6f6
    // hotscroll组件相关
    .hot
      display flex
      padding 0 0.25rem
      line-height 0.85rem
      background-color #FFF
      .laba
        width 0.33rem
        height 0.33rem
        position relative
        top 0.24rem
      .scroll
        width 100%
        height 0.85rem
        overflow hidden
        margin-left 0.3rem
</style>
