<template>
  <div class="wapper">
    <!-- 轮播 -->
    <swiper :bannerImg="bannerImg"></swiper>
    <!-- 搜索 -->
    <search class='searchBar'></search>
    <!-- 天气 -->
    <div class="weather">
      <span class="number">{{isWeather.temp}}°</span>
      <div>
        <div>
          <img :src="isWeather.weather_img">
          <span>{{isWeather.weather}}</span>
        </div>
        <div>
          <!-- <img src="@/assets/images/leaf.png" class="leaf"> -->
          <!-- <img class="leaf"> -->
          <span>空气{{isWeather.pmdj}}:{{isWeather.pm}}</span>
        </div>
      </div>      
    </div>
    <!-- 9宫格 -->
    <div class="box">
      <icons :iconList="iconList" :refs="refs"></icons>
    </div>

    <!-- 热点 -->
    <div class="hot" >
      <div class="hot-left">
        <img class="hot-tip" src="../../assets/images/home/hotTip.png"/>
        <span>|</span>
        <img class="hot-hot" src="../../assets/images/home/hot.png">
      </div>
      <div class="scroll">
        <hot-scroll :cityList='countyHeadlines'></hot-scroll>
      </div>
    </div>

    <!-- 列表 -->
    <index-list ></index-list>

    <tabbar></tabbar>
    <!-- 发布 -->
    <release v-show="showModel"></release> 
  </div>
</template>

<script>
import Tabbar from 'common/Tabbar'
import Swiper from 'common/Carousel'
import Search from 'common/Search'
import Icons from 'common/Icons'
import HotScroll from 'common/HotScroll'
import IndexList from 'common/indexList'
import Release from '@/pages/release/Release'
import cityAll from '../../assets/js/city.js'
import { MessageBox } from 'mint-ui'
export default {
  name: 'Home',
  
  components: {
    Tabbar,
    Swiper,
    Search,
    Icons,
    HotScroll,
    IndexList,
    Release
  },
  data () {
    return {
      showModel:'',
      refs:[
          '/hotInformation',  
          '/hotInformation',
          '/publicnumber',
          '/civilianTelephone',
          '/latestActivities',          
          '/yellowPages',
          '/characteristicGoods',
          '/culturalTourism'
      ],
      // 九宫格数据
      iconList:[],
      // banner数据
      bannerImg:[],
      list:[],  //列表页
      degree:'', //度
      listData:[],
      page:1,
      weid:'', //weid
      cityId:'',  //地区id
      countyHeadlines: [], //县域头条
      isWeather:{},  //天气
    }
  }, 
 
  created () {     
        if(!this.$route.query.userWeid){
            this.getCityLocation()
        }else {
            let id = this.$route.query.userWeid
            this.getAcquiringCounty(id)
        }
       
  },
  beforeRouteLeave: (to, from, next) => {
    console.log(to)
    // to.meta.keepAlive=false    
    next()
 },
  methods: {
    // 获取当前城市
      getCityLocation(){
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(async (r)=>{
            if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
              var mk = new BMap.Marker(r.point);
              let	longiTude = r.point.lng
              let	latiTude = r.point.lat
              let op = latiTude + ',' + longiTude
              localStorage.setItem('op',op)
              const {data:res} = await this.$axios({
                method:'post',
                data:{
                  do:'map',
                  op:op
                }
              })

              // console.log(res.result.ad_info.district);
      
              // if(res.result.ad_info.district !== localStorage.getItem("area")){
              //   MessageBox({
              //       title: '定位到您在',
              //       message: '是否切换至该城市进行探索?',
              //       showCancelButton: true
              //     });
              // }
              
              // 如果定位失败，则执行以下代码
              if(res.status !== 0) {
                  this.$store.commit ('changeWeid',108)
                  localStorage.setItem("bus",'西安市')
                  localStorage.setItem("area",'莲湖区')
                  localStorage.setItem('city','莲湖区')
                  this.$store.commit ('changeCity','莲湖区')
                  this.getIconList()
                  this.getBnnerImg()
                  this.getAllNews()
                  this.getWeather()
                  return 
              }

              let  id = res.result.ad_info.adcode
              this.getAcquiringCounty(id)
            }
          })
      },
    	// 获取县域头条
			async getCountyHeadlines(){
				const {data:res} = await this.$axios({
					method:'post',
					data:{
						do:'index_headline',
						act:'headline',
						weid: this.$store.state.weid
					}
        })
        // console.log(111);
        // console.log(res);
        this.countyHeadlines = res.datas
				// if(res.code !== '200') return console.log("请求数据失败");
				// res.datas.forEach(ele=>{
        //   this.countyHeadlines.push(ele.title)
          
        // })
        
			},
      // 获取banner数据
      async getBnnerImg(){
        const {data:res} = await this.$axios({
          method: 'post',
          data:{
            do:'index_flash',
            weid: this.$store.state.weid,                 
          }
        })
        if(res.code !== '200') return console.log(res.msg);
        this.bannerImg = res.datas
      },
      //获取九宫格数据
      async getIconList () {
        const {data:res} = await this.$axios({
          method:'post',
          data:{
            do:'index_menu',
            weid: this.$store.state.weid,              
          },
        })
        if(res.code !== '200') return console.log(res.msg);
        this.iconList = res.datas
      },
      // 获取天气
      async getWeather(){
        const {data:res} = await this.$axios({
          method:'post',
          data:{
            do:'common',
            act:'weather',
            city: this.$store.state.city,
          }
        })
        // console.log(res);
        if(res.code !== '200') return console.log(res.msg)

        this.isWeather = res.datas
      
      },
      // // 获取县域id
      async getAcquiringCounty(ctId){
        const {data:res} = await this.$axios({
          method:'post',
          data:{
            do:'common',
            districtid:ctId,
            sign:'87126dee0e09e612981c63ece01a8715'
          }
        })
        if(res.code !== '200') return console.log(res.msg);
        // console.log(112233)
        //  console.log(res);
        // 获取到县域id  传到vuex中 
          let id = res.datas.id
          this.$store.commit ('changeWeid',id)
          
          // 省
                localStorage.setItem('province',res.datas.provincename)              
                // 市
                localStorage.setItem("bus",res.datas.cityname)
                // 区
                localStorage.setItem("area",res.datas.districtname)
                localStorage.setItem('city',res.datas.districtname)
                this.$store.commit ('changeCity',res.datas.districtname)


          this.getIconList()
          this.getBnnerImg()
          // this.getAllNews()
          this.getWeather()
          this.getCountyHeadlines()
      },
      getAllNews(){  //全部
         this.$axios({  
        method: 'post',
        data:{
        do:'xinwen_all',
        weid: this.$store.state.weid,
        page:this.page,
        psize:8,
        act:'all',
        //  openid:this.$store.state.openid,
        openid: 'o9K-84mN0qlnbl9zsiwIYg94aw9g'
        },
      })
      
    },
    
  },
  mounted () {
     var _this=this
      this.bus.$on('',function(value){
        // console.log(value)
        _this.showModel=value
      })
    //  console.log('132')   
  },
}
</script>


<style lang="stylus" scoped>
  .wapper
    margin-bottom 1.3rem
    position relative
    background-color #f6f6f6
  .searchBar
    position absolute
    top .48rem
    z-index 99
    width 100%
  // carousel组件相关
  .wapper >>> .mint-swipe-indicator.is-active
    background-color transparent
  .wapper >>> .mint-swipe-indicator
    opacity .6
  .wapper >>> .mint-swipe-indicators
    width 100px
    left 75%
    bottom .5rem
    .mint-swipe-indicator
      width 13px
      height 4px
      border-radius 2px
    .is-active
      vertical-align bottom
      width 8px
      height 8px
      border-radius 50%
      border 4px solid #747373
  // icons组件相关
  .wapper >>> .box
      display flex 
      justify-content center
      height 3.57rem
      position relative
      left 0px
      // top 2rem
      z-index 99
      top -.35rem
      .icons
        width 7rem
        height 3.7rem
        // position absolute
        // top 3.77rem
        border-radius 5px
  // hotscroll组件相关
  .hot
    width 100%
    display flex
    align-items center
    padding 0 0.25rem
    box-sizing border-box
    height 0.85rem
    line-height 0.85rem
    background-color #FFF
    overflow hidden
    margin-bottom 0.2rem
    .hot-left
      width 32%
      span
        color #eee
        margin 0 0.08rem
        vertical-align middle
      .hot-tip
        width 1.14rem
        height 0.3rem
      .hot-hot
        width 0.35rem
        height 0.27rem
    .scroll
      width 68%
  .weather
    // background-color green
    position absolute
    top 2.7rem
    left  0.25rem
    z-index 99
    display flex
    color white
    font-size .18rem
    letter-spacing 1px
    img
      width .5rem
      margin-left .08rem
    .leaf
      width .3rem
      margin-right .1rem
      margin-left .2rem
    .number
      font-size .54rem
      color white
</style>
