<template>
	 <div class="box">
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in menuList"  :key="index" @click.native="HandelBtn(item.id,item.name,index)">
          {{item.name}}
        </tab-item>
      </tab>
      <div :style="{ height: (wrapperHeight-50) + 'px' }" class="main-body">
        <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange"  :bottom-method.stop="loadBottom"  @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"   >     
          <ul>
            <router-link tag="li"  v-for="(item,index) in listData" :key="index" :to="{name:'HotDetails', query:{listId: item.id}}"     >
              <div class="item1" v-if="item.descimgs.length==1">
                <div class="item-left">
                  <img :src="item.descimgs[0]">
                </div>
                <div class="item-right">
                  <div class="title">{{item.title}}</div>
                  <div class="title-detial">
                    <div class="title-size">
                      <!-- <img src="../../assets/images/home/top.png"> -->
                      <span>{{item.time}}</span>
                      <span>{{item.yuedu}}阅读</span>
                    </div>
                    <div class="iconfont" @click.stop="clickOptions(index,item.id,item.is_shou)">&#xeee0;</div>
                  </div>
                </div>
                <div class="model" v-show="index==modelState">
                  <ul>
                    <li @click.stop="collect(item.is_shou)">
                      <div v-if="item.is_shou==0">
                        <i class="iconfont"> &#xe60a;</i>               
                        收藏
                      </div>
                      <div v-if="item.is_shou==1">
                        <i class="iconfont collected"> &#xe60a;</i>               
                        已收藏
                      </div>
                    </li>
                    <li @click.stop="clickClose">
                      <i class="iconfont"> &#xe687;</i>
                      不感兴趣
                    </li>
                  </ul>
                  <span class="close" @click.stop="clickClose()">
                    <i class="iconfont"> &#xe61c;</i>
                  </span>
                </div>
              </div>
              <div class="item2" v-if="item.descimgs.length==3">
                <div class="item2-title">{{item.title}}</div>
                <div class="item2-img" >      
                  <img v-for="(m,index) in item.descimgs" :key='index' :src="m">
                </div>
                <div class="item2-detial">
                  <div class="title-size">
                    <!-- <img src="../../assets/images/home/top.png"> -->
                    <span>{{item.time}}</span>
                    <span>{{item.yuedu}}阅读</span>
                  </div>
                  <div class="iconfont" @click.stop="clickOptions(index,item.id,item.is_shou)">&#xeee0;</div>
                </div>
                <div class="model" v-show="index==modelState">
                  <ul>
                    <li @click.stop="collect(item.is_shou)">
                      <div v-if="item.is_shou==0">
                        <i class="iconfont"> &#xe60a;</i>               
                        收藏
                      </div>
                      <div v-if="item.is_shou==1">
                        <i class="iconfont collected"> &#xe60a;</i>               
                        已收藏
                      </div>
                    </li>
                    <li @click.stop="clickClose">
                      <i class="iconfont"> &#xe687;</i>
                      不感兴趣
                    </li>
                  </ul>
                  <span class="close" @click.stop="clickClose">
                    <i class="iconfont"> &#xe61c;</i>
                  </span>
                </div>
              </div>
              <div class="item3" v-if="item.descimgs.length==0">
                <div class="item3-title">{{item.title}}</div>
                <div class="item3-detial">
                  <div class="title-size">
                    <!-- <img src="../../assets/images/home/top.png"> -->
                    <span>{{item.time}}</span>
                    <span>{{item.yuedu}}阅读</span>
                  </div>
                  <div class="iconfont" @click.stop="clickOptions(index,item.id,item.is_shou)">&#xeee0;</div>
                </div>
                <div class="model" v-show="index==modelState">
                  <ul>
                    <li @click.stop="collect(item.is_shou)">
                      <div v-if="item.is_shou==0">
                        <i class="iconfont"> &#xe60a;</i>               
                        收藏
                      </div>
                      <div v-if="item.is_shou==1">
                        <i class="iconfont collected"> &#xe60a;</i>               
                        已收藏
                      </div>
                    </li>
                    <li @click.stop="clickClose">
                      <i class="iconfont"> &#xe687;</i>
                      不感兴趣
                    </li>
                  </ul>
                  <span class="close" @click.stop="clickClose">
                    <i class="iconfont"> &#xe61c;</i>
                  </span>
                </div>
              </div>
            </router-link> 
          </ul>           
        </mt-loadmore> 
      </div>  
     <div class="nodata" v-if="deep">  <!-- 无数据提示 -->
      <div class="nodata-content">
         <img src="../../assets/images/sousuo.png" >
         <p>正在更新中...</p>
      </div>
    </div>
    </div>
</template>

<script>
 import List from './List'

 export default {
  name: 'tabSwiper',
  props:{
    menuList:Array,
    fenleiId:String
  },
  components:{
  	List
  },
  data () {
    return {
    	demo2:"全部",
    	index:0,
      id:508,
      listData:[],
      shouState:'',
      modelState:'aa' ,
      mId:'',
      nodata:false,
      deep:'',
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      page:1,
      pageTotal:'',
    }
  },
  methods:{
    HandelBtn(id,name,index){
      this.demo2=name
      this.id=id
      this.index=index
      this.page=1
      if(this.index==0){
        this.getAllNews()
      }else{

        this.getListInfo ()
      }         
    },
    clickOptions(index,mId,shou){
      this.modelState=index
      console.log('收藏状态'+shou)
      this.mId=mId
      this.shouState=shou 
    },
    clickClose(index){
      this.modelState=index
    },
    goDetails(id){
      console.log(id)
      this.$router.push({path:'/hotdetails',query:{listId: id}})
    },
    collect(){  //点击收藏
      console.log(this.mId)
        this.$axios({  
        method: 'post',
        data:{
         do:'shoucang',
         act:'zixun',
         weid:this.$store.state.weid,
         id:this.mId,
         openid:this.$store.state.openid,
        },
        }).then(res=>{
          console.log(res)
          if(res.data.code==402 || res.data.code==401){
            this.$router.push('/login')
          }else{
            this. getAllNews()
          }
      })
    },    
    getAllNews(){  //全部
      if(this.fenleiId==20){
        this.$axios({  //聚焦尉氏全部
        method: 'post',
        data:{
           do:'xinwen_all',
           weid:this.$store.state.weid,
           page:this.page,
           psize:5,
           act:'all',
           openid:this.$store.state.openid,
        },
        }).then(res=>{
            console.log(res)
          this.listData=this.listData.concat(res.data.datas)
          this.pageTotal=res.data.pageTotal
          console.log(this.listData.length)
          if(res.data.code=='400'){
              this.deep=true
          }else{
              this.deep=false
          }
        }) 
      }
      if(this.fenleiId==19){
        this.$axios({  //惠民共享全部
        method: 'post',
        data:{
         do:'xinwen_all',
         weid:this.$store.state.weid,
         page:this.page,
         act:'all',
         psize:8,
         type:'hmzc',       
         openid:this.$store.state.openid,
        },
        }).then(res=>{
          console.log(res)
          this.listData=this.listData.concat(res.data.datas)
          this.pageTotal=res.data.pageTotal
          if(res.data.code=='400'){
              this.deep=true
            }else{
              this.deep=false
          }
        }) 
      }
      
    },
    getListInfo () {
        this.$axios({  //分类内容
        method: 'post',
        data:{
         do:'xinwen_news',
         weid:this.$store.state.weid,
         type_id:this.id,
         page:this.page,
         psize:8,
         openid:this.$store.state.openid,
        },
        }).then(res=>{
            console.log(res)            
            this.listData=res.data.datas
            this.total=res.data.pageTotal
           if(res.data.code=='400'){
              this.deep=true
            }else{
              this.deep=false
          }
      })  
    },
    // 下拉加载
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
        if(this.page<this.pageTotal){
            this.page++
            this.getAllNews()
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
        this.page=1
        this.getAllNews()        }
  },
  created () {
      this.getAllNews()
  },
   mounted() {
   
     // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadmore.getBoundingClientRect().top;
    }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
  .item1,.item2,.item3
    display flex
    width 100%
    padding 0.35rem 0.25rem
    box-sizing border-box
    background-color: #FFF
    border-bottom 0.001rem solid #eee
  .title-detial,.item2-detial,.item3-detial
    display flex
    justify-content space-between
    align-items center
    margin-top 0.4rem
    .title-size
      color rgb(178,178,178)
      font-size 0.2rem
      img
        width 0.49rem
        height 0.26rem
      span
        margin 0 0.05rem
  .item1
    justify-content space-between
    position relative
    .item-left
      width 2.28rem
      height 1.50rem
      margin-right 0.3rem
      img
        width 2.28rem
        height 1.50rem
        display  inline-block
    .item-right
      display flex
      flex-direction column
      justify-content center
      overflow hidden
      flex 1
      .title
        ellipsis()
        color rgb(51,51,51)
        font-size 0.3rem
  .item2,.item3
    flex-direction column
    position relative
    .item2-title
      ellipsis()
      margin-bottom 0.16rem
    .item2-img
      display flex
      justify-content space-between
      // height 1.5rem
      img
        width 2.25rem
        height 1.50rem  
    .item2-detial
      margin-top 0.15rem
  .item3
    .item3-title
      display -webkit-box    
      -webkit-box-orient vertical    
      -webkit-line-clamp 2  
      overflow hidden
.model
  width 4rem
  background-color rgba(240,240,240,.9)
  position absolute
  right 0px
  top 0
  bottom 0px
  margin auto 0
  display flex
  float right
  ul
    display flex
    justify-content center
    align-items center
    flex 1  
    height 100%
    letter-spacing 1px
    li
      text-align center
      font-size .24rem
      color #333
      .iconfont
        display block
      .collected
        color orange
    li:nth-child(1)
      margin-right .7rem
  span
    position absolute
    right .3rem
    bottom .2rem
	.box >>> .scrollable .vux-tab-item
		
		position relative
	.box >>> .vux-tab-selected
		color rgb(232, 26, 0)!important
		
	.box >>>.vux-tab-ink-bar  
		background-color rgb(232, 26, 0)!important
		width .75rem!important
		margin 3px auto 0
		position absolute
		z-index 99
		bottom 23px !important
	.box >>> .vux-tab-wrap
		padding-top 0.88rem
	.box >>> .vux-tab-container
		height 0.88rem
	.box >>> .vux-slider ,
	.box >>> .vux-slider > .vux-swiper
		overflow visible!important
.nodata
  position fixed
  background-color white
  z-index 9999
  top 2.2rem
  right 0
  bottom 0
  left 0
  margin auto
  heigth 100%
  display flex
  justify-content space-between
  align-items center
  flex-direction column 
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
.main-body 
  /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
  overflow  scroll

</style>