<template>
<div class="box">
    <div class="page-loadmore-wrapper" ref="wrapper" >
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"       :bottom-method.stop="loadBottom" 
          @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"> 
        	<div class="top">
                <i class="iconfont" @click="Goback">&#xe671;</i>
                <div class="search-bar"> 
                    <i  class="iconfont ">&#xe6c6;</i>
                    <input type="search" placeholder="请输入你要搜索的关键词" @click='goSearch'>
                </div>
            </div>
            <phone-icons :iconsList="iconsList"></phone-icons> <!-- 便民电话分类 -->
            <phone-list   v-for='(item,index) in list' :item="item" :key="index"></phone-list>  <!-- 便民电话首页列表 -->
        </mt-loadmore>
    </div> 
</div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
import PhoneList from './list.vue'
import PhoneIcons from './icons.vue'
export default {

  name: 'CivilianTelephone',
  components:{
    PhoneList,
    PhoneIcons
  },

  data () {
    return {
        list:[],  //主页列表            
        iconsList:[],
        allLoaded: false,
        bottomStatus: '',
        topStatus: '',
        page:1,
        pageTotal:'',
    }
  },
  methods:{
    Goback(){
      this.$router.push('/')
    },
    goSearch(){
         this.$router.push('/historicalslist')
    },
    phoneIcons(){
        this.$axios({  //电话分类
        method: 'post',
        data:{
         do:'tel_list',
         act:'fenlei',
         weid:this.$store.state.weid,
         page:this.page
        },
        }).then(res=>{
          this.iconsList=res.data.datas
          console.log( this.iconsList)
      })
    },
    getHomeInfo () {
      this.$axios({  //首页列表页
        method: 'post',
        data:{
         do:'tel_list',
         weid:this.$store.state.weid,
         page:this.page,
         psize:8

        },
        }).then(res=>{
          this.list=this.list.concat(res.data.datas)
          this.pageTotal=res.data.pageTotal
      })      
    },
    handleBottomChange(status) {
        this.bottomStatus = status;
    },
    loadBottom() {
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
        console.log('下拉加载')
        if(this.page<this.pageTotal){
            this.page++
            this.getHomeInfo()
            console.log('下拉加载')
        }
    },
    handleTopChange(status) {
        this.topStatus = status;
    },
    loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
        console.log('上拉加载')
        if(this.page>0){
            this.page--
            this.getHomeInfo()
        }
     },  
  },
  created () {
      this.getHomeInfo()
      this.phoneIcons() 
       console.log(this.$refs.loadmore)
  },
  mounted(){
    console.log(this.$store.state.weid)
  }

}
</script>

<style lang="stylus" scoped>
  .box
    background #f6f6f6
    .top
      padding .48rem .35rem .2rem
      font-size .32rem
      color #000
      position relative
      text-align center
      letterSpaceing()
      height .6rem
      display flex       
      .iconfont
        line-height .6rem
      .search-bar
        height .6rem
        background green
        float right
        flex 1
        margin-left .2rem
        border-radius .3rem
        background white
        font-size 0
        .iconfont
          line-height .6rem 
        input
          height .6rem
          font-size .13rem
          letterSpaceing()
          padding-left .1rem
          width 86%
          outline none   
          vertical-align top           
</style>