<template>
	<div>
		<div class="title border-bottom">
		    <i class="iconfont" @click="Goback">&#xe671;</i>
		    {{pinglunList.length}}条回复
 		 </div>
 		 <ul class="tab-swiper border-bottom" >
          <li>
            <img :src="selfList.avatar">
            <div class="left">
              <div class="top">
                <div class="top-left">
                  <span class="name">{{selfList.name}}</span>
                  <span class="time">{{selfList.time}}</span>
                </div>
                <div class="top-right">
                   <span class="collect" @click="parentZan()"> 
                     <i class="iconfont" v-if='selfList.is_zan=="0"'>&#xe696;</i>
                      <i class="iconfont" style="color:orange" v-else>&#xe696;</i>
                     {{selfList.laud_num}}
                   </span>
                </div>
              </div>
              <p class="left-bottom" >
                {{selfList.content}}
              </p>
            </div>
          </li>
        </ul>
        <!-- 回复列表 -->
        <div class="replay-box">
        	<p>全部回复</p>
        	<ul class="tab-swiper" v-show="pinglunList.length>=1"> 
            <li class="border-bottom"  v-for="(item,index) in pinglunList" :key="item.id" >   
              <img :src="item.avatar">
              <div class="left">
                <div class="top">
                  <div class="top-left">
                    <span class="name">{{item.name}}</span>
                    <span class="time">{{item.time}}</span>
                  </div>
                  <div class="top-right" @click="collect(item.id)">
                     <span class="collect" > <!--收藏 -->
                       <i class="iconfont" v-if='item.is_zan=="0" '>&#xe696;</i>
                       <i class="iconfont" style="color: orange" v-else>&#xe696;</i>
                       {{item.zhi_zan}}
                     </span>
                  </div>
                </div>
                <p class="left-bottom"  @touchstart="showOption(index)" @touchend="clearLoop">
                  {{item.content}}
                </p>
              </div>
              <div class="option-box" v-show="option==index">
              	 <div class="option-btn">
              	 	<span @click="replayOptions(item.name)">
              	 		<i class="iconfont">&#xe621;</i>
              	 		回复
              	 	</span>
              	 	<span @click="deleteBtn(item.id)" v-show="item.oneself==1">
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
            </li>            
          </ul>
        </div>
        <div class="publish">  <!-- 回复 -->
          <input type="text" name="" v-model="body" :placeholder="placeholder" >
          <span @click="secondPinglun()">发送</span>
        </div>
         <!-- <div class="publish">
          <input type="text" name="" v-model="body" :placeholder="placeholder" >
          <span @click="secondPinglun()">发送</span>
        </div> -->
         <alert v-show="alertStatus" :alertTip="alertTip"></alert>
      </div>

</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
import alert from 'common/alert.vue'
export default {

  name: 'Replay',
  components:{
    alert
  },
  props:{
    // listId:Array
  },
  data () {
    return {
      alertStatus:false,
      alertTip:'请输入评论内容',
       number:3,
       option:'qq',
       timer:'',
       replay:false,
       id:this.$route.query.id,
       index:this.$route.query.pid,
       index2:this.$route.query.index,
       selfList:'',
       body:'',
       pinglunList:[],
       zanState:true,
       replay:false,
       placeholder:'说的什么吧...'
    }
  },
   methods:{
  	 Goback(){
      this.$router.go(-1)
    },
    showOption(index){
    	clearInterval(this.timer);//再次清空定时器，防止重复注册定时器
    	const _this=this
	    _this.timer=setTimeout(function(){
	        _this.option=index
	    },1000);
    },
    clearLoop(){
    	clearInterval(this.timer);

    },
    replayOptions(name){
      
      this.replay=true
      this.option=name
      this.placeholder='回复'+name+':'
    },
    current(){  //查看父级评论
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_review',
            act:'review',
            id:this.id,
            psize:8,
            weid:this.$store.state.weid,
            pindex:1,
            openid:this.$store.state.openid,      
          },
        }).then(res=>{  
          console.log(res)               
          this.selfList=res.data.datas[this.index]
          console.log(this.selfList)
      })
    },
    parentZan(){  //父级评论点赞
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_running',
            openid:this.$store.state.openid,
            pinglunid:this.index2,
            weid:this.$store.state.weid,
            act:'zan'      
          },
        }).then(res=>{     
          console.log(res)  

          this.current()
      })
    },
    secondPinglun(){  //发布子级评论
      if(this.body==''){
       this.alertStatus=true
      }else{
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_running',
            openid:this.$store.state.openid,
            id:this.index2,
            content:this.body,
            weid:this.$store.state.weid,
            act:'running'      
          },
        }).then(res=>{   
        console.log(res) 
          this.seeSecondPinglun()
          this.body=''
          this.placeholder='说点什么吧...'
      })
    }
    },
    seeSecondPinglun(){  //查看子级论平
      console.log(this.index2)
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_again',
            act:'Again',
            weid:this.$store.state.weid,
            agentid:this.index2,
            pindex:1,
            openid:this.$store.state.openid,    
          },
        }).then(res=>{ 
        console.log(res) 
          this.pinglunList=res.data.datas
          console.log(this.pinglunList)
      })   
    },
    collect(id){ //子级评论点赞
      console.log(id)
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_running',
            openid:this.$store.state.openid,
            pinglunid:id,
            weid:this.$store.state.weid,
            act:'zan'      
          },
        }).then(res=>{     
          console.log(res)            
          this.seeSecondPinglun()
      })
    },
    deleteBtn(id){ //删除子级评论
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
          console.log(res)            
          this.seeSecondPinglun()
          this.option=''
      })
    },
    Report(id){
      this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_report',
            openid:this.$store.state.openid,
            pinglunid:id,
            weid:this.$store.state.weid,
            act:'report'      
          },
        }).then(res=>{     
          console.log(res)            
          this.option=''
      })
    }
  },

  mounted(){
    this.current()
    this.seeSecondPinglun()
    var _this=this
    this.bus.$on('send',function(val){
      console.log(val)
      _this.alertStatus=val
    })
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
      color #666

.tab-swiper
  padding-right 0!important
  box-sizing border-box
  margin-top .2rem
  padding-left .25rem
  li
    display flex
    width 100%
    padding-top .2rem
    padding-bottom .3rem   
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
      .left-bottom
        font-size .28rem
        color rgb(51, 51, 51)
        padding-top .2rem
        letter-spacing 1px
  .option-box
  	width 3.25rem  	
  	position absolute
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
.replay-box
	padding 0 .25rem
	box-sizing border-box
 margin-bottom 1.5rem 
	p
		padding-top .3rem
		font-size .26rem
		color rgb(102,102,102)
		letter-spacing 1px
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
    // width 3.92rem
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
    margin-right .45rem
    letter-spacing 1px
    flex 1
  .publish-right
    flex 1      
    span:nth-child(2)
      margin 0 .6rem   
</style>