<template>
	<div>
		<div class="title-box">
       <h3 class="title">
         {{details.title}}
       </h3>
       <p class="title-desc">
         <span>{{details.laiyuan}}</span>
         <span>{{details.time}}</span>
         <span>{{details.yuedu}}次浏览</span>
       </p>
	  </div>
	  <div class="article-content" v-html = 'details.content'>
	            <!-- {{details.content}} -->
	  </div>
    <div class="state">
        <div class="zan" @click="collect"> <!-- 收藏 -->
            <div v-if="collectState==true">
              <i class="iconfont">&#xe60a;</i>
              <span>{{details.shou_num}}</span> 
            </div>
            <div v-else>
              <i class="iconfont" style="color: orange">&#xe60a;</i>
              <span>{{details.shou_num}}</span> 
            </div>
        </div>


        <div class="collect" @click="zan">  <!-- 点赞 -->
           <div v-if="zanState==true">
              <i class="iconfont">&#xe696;</i>
              <span>{{details.zan}}</span> 
           </div>
           <div v-else>
              <i class="iconfont" style="color: orange">&#xe696;</i>
              <span>{{details.zan}}</span> 
           </div>
        </div>
    </div>
    <!-- 推介 -->
   <!-- <recommend-list :listId="listId" @reloadView="listId">  </recommend-list> -->
    <!-- <div class="recommend" >
      <p class="title border-bottom">
        <span>推介资讯</span>
      </p>
      <ul>
          <li class="border-bottom" v-for="item in recommendData" @click="goDetails(item.id)">
            <img :src="item.thumb|url">
            <div class="right">
               <p>
                 {{item.title}}
               </p>
               <p class="recommend-state">
                   <span class="time">{{item.time}}</span>                      
                   <span>{{item.yuedu}}次浏览</span>
                   <span class="iconfont">&#xeee0;</span>
               </p>
             </div>
          </li>             
      </ul>
    </div> -->
    <!-- 显示评论 -->
    <div class="comment">
      <ul class="tab-btn border-bottom">
        <li @click="tab(index)"  v-for="(item,index) in btnList"  >
          {{item}}
          <span class="line" v-show="index==curId ? true:false"></span>
        </li>
      </ul>
      <div>
        <ul class="tab-swiper vux-center">
          <li class="border-bottom" v-for="(item,index) in recommendList" :key="item.id">
            <img :src="item.avatar">
            <div class="left">
              <div class="top">
                <div class="top-left">
                  <span class="name">{{item.name}}</span>
                  <span class="time">{{item.time}}</span>
                </div>
                <div class="top-right">
                   <span class="collect" @click="zanPingLun(item.id,index)"> 
                     <i class="iconfont" v-if='item.zanPingLunState==true'>&#xe696;</i>
                     <i class="iconfont" style="color: orange" v-else>&#xe696;</i>                     
                     {{item.laud_num}}
                   </span>
                   <span class="pinglun" @click='goReplay(item.id,index)'>   
                     <i class="iconfont">&#xe621;</i>
                      {{item.pinglun_num}}
                   </span>
                </div>
              </div>
              <p class="left-bottom" @click='goReplay(item.id,index)' @touchstart="showOption(index)" @touchend="clearLoop">
                {{item.content}}
              </p>
              <div class="option-box" v-show="option==index">
                 <div class="option-btn">
                  <span @click='goReplay(item.id,index)'>
                    <i class="iconfont">&#xe621;</i>
                    回复
                  </span>
                  <span v-show="item.oneself==1" @click="deleteBtn(item.id)">
                    <i class="iconfont">&#xe625;</i>
                    删除
                  </span>
                  <span v-show="item.oneself==0" @click="Report(item.id)">
                    <i class="iconfont">&#xe73b;</i>
                    举报
                  </span>
                 </div>
                 <div class="cart"></div>
              </div>
            </div>
          </li>
          <p class="read-more">展开更多评论</p>
        </ul>
      </div>
    </div>
      <!-- 发布评论 -->
    <div class="publish">
      <input type="text" name="" v-model="body" placeholder="说的什么吧..." @keyup.enter='recommend'>
        <div class="publish-right">
           <span> <!-- 评论 -->
            <i class="iconfont">&#xe621;</i>
            <i class="recommendNumber">{{pNumber}}</i>
           </span>

           <span @click="collect" > <!-- 收藏 -->
            <i class="iconfont" v-if="collectState==true">&#xe60a;</i>
            <i class="iconfont" style="color: orange" v-else>&#xe60a;</i>
           </span>

           <span @click="forward"> <!-- 转发 -->
            <i class="iconfont">&#xe600;</i>
           </span>
        </div>
    </div>
    <!-- 转发 -->
    <!-- <div class="float" v-show="modelState" >
      <div class="model">
        <div class="icons">
          <mt-swipe :auto="0" :show-indicators="false">
              <mt-swipe-item class="swipe-item border-bottom" v-for="(page,index) of pages" :key="index" >
                <div class="icon " v-for="(item,id) of page" :key="item.id">
                  <div class="icon-img">
                    <img class="icon-img-content" :src="item.thumb" />
                    <p class="icon-keyword">{{item.name}}</p>
                  </div>
                </div>
              </mt-swipe-item>   
          </mt-swipe>
        </div>
        <ul class="copy">
          <li>
              <img src="../../../assets/images/zf/w7.png">
              <p >复制链接</p>
          </li>
          <li >
            <img src="../../../assets/images/zf/w6.png">
            <p>举报</p>
          </li>
        </ul>
        <span class="close" @click="close">取消</span>
      </div>
    </div> -->
    <alert v-show="alertStatus" :alertTip="alertTip"></alert>
	</div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
import alert from 'common/alert.vue'
export default {
  name: 'article',
  props:{
    listId:String
  },
  components:{
    alert
  },
  data () {
    return {
      alertTip:'请输入评论',
      alertStatus:false,
      collectState:true,
      zanState:true,
      details:'',
      shou:'',
      zann:'',
      btnList:['最新评论','热门评论'],
      curId: 0,
      body:'',
      modelState:false,
      zanPingLunState:true,  //评论顶赞的状态
      pNumber:'',
      pzan:'',
      /*list:[
            {
              name: "县域圈子",
              thumb:require('../../../assets/images/zf/w1.png'),
              weid: "108",
            },
            {
              name: "微信",
               thumb:require('../../../assets/images/zf/w2.png'),
              weid: "108",
            },
            {
              name: "盆友圈",
               thumb:require('../../../assets/images/zf/w3.png'),
              weid: "108",
            },
            {
              name: "微博",
               thumb:require('../../../assets/images/zf/w4.png'),
              weid: "108",
            },
            {
              name: "QQ空间",
               thumb:require('../../../assets/images/zf/w5.png'),
              weid: "108",
            },
            {
              name: "QQ空间",
               thumb:require('../../../assets/images/zf/w8.png'),
              weid: "108",
            }
        ],*/
      recommendList:[],
      // recommendData:[],
      option:'qq'

    }
  },
  methods:{
    getDetailsInfo () {//详情页文章
        var _this=this
        this.$axios({  
          method: 'post',
          data:{
           do:'fu_details',
           act:'details',
           id:this.$route.query.listId,
           weid:this.$store.state.weid,
          },
        }).then(res=>{
            _this.details=res.data.datas
            // console.log(_this.details)
        })
    },
    collect(){  //点击收藏
     var _this=this
        this.$axios({  
        method: 'post',
        data:{
         do:'shoucang',
         act:'weixin',
         weid:this.$store.state.weid,
         id:_this.listId,
         openid:this.$store.state.openid        
        },
        }).then(res=>{
          // console.log(111)
          // console.log(res)
          _this.shou = res.data.datas.status  
          if(_this.shou==1){
            this.collectState=false
          }else{
            this.collectState=true
          }
          _this.getDetailsInfo()  
      })     
    },
    zan(id){  //点赞
       var _this=this
        this.$axios({  
        method: 'post',
        data:{
         do:'wxnews_laud',
         act:'laud',
         weid:this.$store.state.weid,
         id:_this.listId,
         openid:this.$store.state.openid      
        },
        }).then(res=>{ 
          console.log(res.data.datas.status) 
          _this.zann = res.data.datas.status  
          if(_this.zann==1){
            this.zanState=false
          }else{
            this.zanState=true
          }
          _this.getDetailsInfo()  
        })           
    },
    // 推介
    // getrecomendData(){
    //  var _this=this
    //   this.$axios({  //详情页推介
    //     method: 'post',
    //     data:{
    //      do:'xinwen_referrer',
    //      act:'referrer',
    //      id:this.listId,
    //      weid:this.$store.state.weid
    //     },
    //     }).then(res=>{
    //         console.log(res.data.datas)
    //         _this.recommendData=res.data.datas
    //   })
    // },
    goDetails(id){//推介跳到详情页
      // console.log(id)
      this.$router.push({path:'/hotdetails',query:{listId: id}})
      this.bus.$emit('', id)
    },
    // 评论
    tab (index) { //热门与最新切换
      this.curId = index;
      // console.log(this.curId)
      if(this.curId==0){

      }
    }, 
    getData(){
      this.listId = this.$route.query.listId
    },
    forward(){ //转发
      this.modelState=true
    },
    close(){  //关闭转发model
      this.modelState=false
    },
    handelClick(index){  //转发跳转
      // console.log(this.refs[index])
      this.$router.push(this.refs[index])
    },
    recommend(){//发表评论    
        var _this=this
        if(this.body!=''){
            this.$axios({  
            method: 'post',
            data:{
              do:'fu_comment',
              act:'comment',
              weid:this.$store.state.weid,
              newsid:_this.listId,
              openid:this.$store.state.openid,
              body:this.body       
            },
          }).then(res=>{                 
            this.body=''
            // console.log(111)
            // console.log(res)
            this.readRecommend()
            // this.recommendList=res.data.datas
          })
        }else{
          _this.alertStatus=true
        }
        
     
    },
    readRecommend(){ //查看评论
      // console.log(this.listId)  
      var _this=this
        this.$axios({  
          method: 'post',
          data:{
            do:'fu_review',
            act:'review',
            id:_this.listId,
            psize:8,
            weid:this.$store.state.weid,
            pindex:1,
            openid:this.$store.state.openid,     
          },
        }).then(res=>{                 
          this.recommendList=res.data.datas
          this.pNumber=res.data.datas.length
      })
    },
    zanPingLun(id,index){  //评论点赞
      // console.log(id)
        var _this=this
        this.$axios({  
          method: 'post',
          data:{
            do:'fu_running',
            openid:this.$store.state.openid,
            pinglunid:id,
            weid:this.$store.state.weid,
            act:'zan'      
          },
        }).then(res=>{     
          // console.log(res)  
          _this.pzan = res.data.datas.is_num
          if(_this.pzan==1){
            this.zanPingLunState=false
          }else{
            this.zanPingLunState=true
          }
          this.readRecommend()
      })
    },
    showOption(index){ //长安显示
      clearInterval(this.timer);//再次清空定时器，防止重复注册定时器
      const _this=this
      _this.timer=setTimeout(function(){
          _this.option=index
      },1000);
    },
    clearLoop(){
      clearInterval(this.timer);

    },
    deleteBtn(id){
      this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_report',
            openid:this.$store.state.openid,
            id:id,
            weid:this.$store.state.weid,
            act:'delete'      
          },
        }).then(res=>{     
          // console.log(res)            
          this.readRecommend()
          this.option='qq'
      })
    },
    Report(){
      this.$axios({  
          method: 'post',
          data:{
            do:'fu_report',
            openid:this.$store.state.openid,
            id:id,
            weid:this.$store.state.weid,
            act:'report'      
          },
        }).then(res=>{     
          // console.log(res)            
          this.option='qq'
      })
    },
    goReplay(index,id){  //回复评论
      // console.log(index)
       // console.log(id)
      this.$router.push({path:'./replay',query:{id: this.listId,pid:id,index:index,articleId:this.listId}})
      this.$router.push({
        name:'Replay',
        params:{
          id:this.recommendList[index]
        }
      })
        var _this=this
        this.$axios({  
          method: 'post',
          data:{
            do:'fu_running',
            act:'review',
            id:_this.listId,
            psize:8,
            weid:this.$store.state.weid,
            pindex:1       
          },
        }).then(res=>{                 
          this.recommendList=res.data.datas
          // console.log(res)
      })
    }  

  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((item,index) => {
        const page = Math.floor(index / 5)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  mounted(){ 
    this.getData()
    this.getDetailsInfo()
    this.readRecommend()
    // this.getrecomendData()
    var _this=this
    this.bus.$on('send',function(val){
      // console.log(val)
      _this.alertStatus=val
    })
  },
  
}
</script>

<style lang="stylus" scoped>
// 标题
.title-box
  padding 0.5rem .25rem
  box-sizing border-box
  .title
    font-size .44rem
    color #000
    text-align center
  .title-desc
    color rgb(178, 178, 178)
    font-size 0.24rem
    padding-top 0.1rem
    span:nth-child(1)
      margin-right .2rem
    span:nth-child(3)
      float right
// 文章内容
.article-content
  font-size 0.32rem
  color rgb(51,51, 51)
  line-height 0.5rem
  padding 0 .25rem
  box-sizing border-box
  overflow hidden
// 点赞区
.state
  display flex
  justify-content center
  border-bottom .2rem solid #f6f6f6
  .zan
    width 2.25rem
    line-height .65rem
    height .65rem
    border-radius 0.325rem
    border 1px solid #ccc
    margin-top .3rem
    margin-bottom .4rem
    display flex
    justify-content center
    align-items center
  .collect
    width 2.25rem
    line-height .65rem
    height .65rem
    border-radius 0.325rem
    border 1px solid #ccc
    margin-top .3rem
    margin-bottom .4rem
    display flex
    justify-content center
    align-items center
    span
      color #000
      font-size .24rem
      padding-left .2rem
      letter-spacing 1px
  .zan
    margin-right .65rem
// 评论
.line
  display block
  height 0.04rem 
  background red
  width .75rem
  position absolute
  bottom 0.5rem
  left 0px
  right 0px
  margin 0 auto
.comment
  margin-bottom 1.5rem
  .tab-btn
    height 0.88rem
    width 100%
    display flex
    align-items center
    justify-content center
    li
      position relative
      line-height .88rem
      font-size .28rem
      color rgb(51,51,51)
      letter-spacing 1px
    li:nth-child(1)
      margin-right 1.2rem
  .tab-swiper
    padding-right 0!important
    box-sizing border-box
    margin-top .2rem
    padding-left .25rem
    li
      display flex
      width 100%
      padding-top .3rem
      padding-bottom .45rem 
      position relative      
      img
        width .66rem
        height .66rem
        border-radius 50%
        margin-right .2rem
      .left
        flex 1
        padding-right 0.25rem
        .top
          display flex
          align-items center
          justify-content space-between
          .top-left
            span
              display block
            .name
              font-size .3rem
              color rgb(102,102, 102)
            .time
              font-size .2rem
              color rgb(178,178, 178)
          .top-right
            .collect
              margin-right .3rem
        .left-bottom
          font-size .28rem
          color rgb(51, 51, 51)
          padding-top .2rem
          letter-spacing 1px
    .read-more
      font-size .28rem 
      color rgb(153,153,153)
      text-align center
      line-height .8rem
.option-box
    width 3.25rem   
    position absolute
    top .7rem
    left 2.3rem
    height 1rem
    text-align center
    .option-btn
      background rgb(76,81,84)
      width 100%
      height .7rem
      display flex
      justify-content space-between
      align-items center
      span
        width 50%
        color white
        text-align center
        font-size .24rem
        letter-spacing 1px
    .cart
      width 0
      height 0
      border-width 8px
      border-style solid
      border-color rgb(76,81,84) transparent transparent transparent;
      margin 0 auto
.publish
  padding 0 .35rem 0 .23rem
  height .96rem
  display flex
  background-color white
  border-top 1px solid rgb(238, 238, 238)  
  align-items center
  position fixed
  bottom 0
  z-index 99
  width 100%
  box-sizing border-box
  input
    width 3.92rem
    line-height .6rem
    background-color rgb(247, 247, 247)
    height .6rem
    display inline-block
    outline none
    -webkit-appearance none
    border-radius 0
    border-radius .3rem
    padding 0 .2rem
    box-sizing border-box
    font-size .24rem
    color rgb(153,153,153)
    border 1px solid rgb(238, 238, 238)
    margin-right .25rem
    letter-spacing 1px
  .publish-right
    flex 1 
    // background-color red
    span
      position relative
      .iconfont
        font-size .6rem
      .recommendNumber
        position absolute
        top -15px
        right -10px
        background-color red
        padding 0 .15rem
        color white
        height .3rem
        font-size .1rem !important
        border-radius .15rem   
    span:nth-child(2)
      margin 0 .39rem 
// float
.float
  background rgba(0, 0, 0, .2)
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 999!important
  overflow-y hidden
  .model
    width 100%
    height 5.3rem
    background-color rgb(238,238,238)
    position absolute
    bottom 0px
    .mint-swipe
      box-sizing border-box
      height 2.5rem
      padding 0 0.2rem
    .icons
      overflow: hidden
      .swipe-item
        height 2.3rem
      .icon
        overflow hidden
        width 20%
        height 1.6rem
        float left
        position relative       
        margin-top: 0.4rem
        text-align center     
        .icon-img
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          box-sizing border-box
          .icon-img-content
            width 1.12rem
            height 1.09rem
            display block
            margin 0 auto
          .icon-keyword
            position absolute
            left 0
            right 0
            bottom 0
            height .44rem
            line-height .44rem
            color #000
            text-align center
            font-size 0.20rem
            ellipsis()
    .copy
      padding 0 .2rem
      li
        float left
        width 20%
        text-align center
        padding-top .1rem
        img
          width 1.09rem
          height 1.09rem
          border-radius 50%
          display block!important
        p
          color #000
          font-size  .2rem
          padding-top .1rem
          width 100%

    .close
      position absolute
      bottom 0px
      line-height .91rem
      text-align center
      font-size .3rem
      color #000
      width 100%
      display block
      left 0px
      right 0px
      margin 0 auto
      letter-spacing 1px
      background #fff
// 推介
.recommend  
   border-bottom .2rem solid #f6f6f6
  .title
    line-height .8rem
    font-size .32rem
    padding 0 .25rem
    box-sizing border-box 
    span
      border-left 3px solid red
      padding-left .2rem
  ul
    padding 0 .25rem
    box-sizing border-box 
    li
      padding .35rem 0
      display flex
      img
        width 2.2rem
        height 1.59rem
        margin-right .2rem
      .right
        flex 1
        position relative
        letter-spacing 1px
        .recommend-state
          position absolute
          bottom 0
          width 100%
          color rgb(178, 178, 178)
          font-size 0.24rem
          padding-top 0.1rem
          display flex
          align-items flex-end
          justify-content space-between
          align-items center
          
          .time
            
          span:nth-child(1)
            width 2rem
            display inline-block
            overflow hidden
            height .35rem
          span:nth-child(1)
            margin-right .2rem
          // span:nth-child(3)
          //   float right
</style>