<template>
<div>
	<header-bar :title="title"></header-bar>
  <div class="page-loadmore-wrapper top65" ref="wrapper" >
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"       :bottom-method="loadBottom" 
          @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"> 
           <phone-list v-for='(item,index) in list' :item="item" :key="index" ></phone-list>   <!-- 便民电话列表 -->
        </mt-loadmore>
  </div> 
	<div class="nodata" v-show="deep">
      <div class="nodata-content">
         <img src="../../../../assets/images/sousuo.png" >
         <p>正在更新中...</p>
      </div>
    </div> 
</div>
</template>

<script>
import PhoneList from './list.vue'
import HeaderBar from 'common/headerbar.vue'
export default {
  name: 'searchlist',
  components:{
  	PhoneList,
    HeaderBar
  },

  data () {
    return {
        title:"搜索列表",
        list:[], //搜索列表
        keywords:'', //首页搜索关键字
        id:this.$route.query.id,  //首页分类id
        keys:this.$route.query.keys,
        deep:'',
        allLoaded: false,
        bottomStatus: '',
        topStatus: '',
        page:1,
        pageTotal:'',
    }
  },
  methods:{
    // home通过关键字搜索
    async getCivTelephone(){
        const {data:res} = await this.$axios({
          method:'post',
          data:{
            weid:this.$store.state.weid,
            act:'phone',
            keywords: this.keywords,
            page:this.page,
            psize:8,
            do:'index_search'
          }
        })
        console.log(res)
        if(res.code !== '200') return console.log("请求数据失败");
        this.list = res.datas
    },
    search(key){
      this.$axios({  //公用搜索方法
          method: 'post',
          data:{
           do:'tel_list',
           act:'keyw',   
           weid:this.$store.state.weid,
           page:this.page,
           psize:8,
           keyword:this.keys
          },
          }).then(res=>{
             console.log(res.data.datas)            
             this.list=this.list.concat(res.data.datas)
             this.pageTotal=res.data.pageTotal
            if(res.data.code=='400'){
              this.deep=true
            }
      })
      this.$axios({  //首页分类列表页
        method: 'post',
        data:{
          do:'tel_list',
          act:'list',
          weid:this.$store.state.weid,
          page:this.page,
          psize:8,
          blei:this.id
        },
      }).then(res=>{
          console.log(res)
          this.list=this.list.concat(res.data.datas)
          this.pageTotal=res.data.pageTotal
          this.deep=false
      })
    },
    handleBottomChange(status) {
        this.bottomStatus = status;
    },
    loadBottom() {
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
        if(this.page<this.pageTotal){
            this.page++
            this.search()
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
            this.search()
        }
     },  
  },
  created:function(){
      var _this=this
      this.bus.$on('',function(value){
        console.log(value)
        _this.list=value.datas
        _this.deep=false
        _this.pageTotal=value.pageTotal
      })    
    let keyWd = this.$route.query.keyword
    if(keyWd){
        this.keywords = keyWd
    }
  },
  mounted(){
    this.getCivTelephone()
    this.search()
  }
}
</script>

<style lang="stylus" scoped>
.title
  padding .6rem .35rem .2rem
  background rgb(247, 246, 246)
  font-size .32rem
  color #000
  position relative
  text-align center
  letter-spacing 1px
  .iconfont
    width value
    position absolute
    left .35rem
    color #333
.nodata-content
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center
  img
    
    width: 3rem
  p
   padding-top .5rem
   color #666
   font-size .26rem
   letter-spacing 1px
.top65
  padding-top 1.28rem
</style>