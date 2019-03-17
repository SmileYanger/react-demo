<template>
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
          <li class="border-bottom" v-for="(item,index) in recommendList">
            <img :src="item.avatar">
            <div class="left">
              <div class="top">
                <div class="top-left">
                  <span class="name">{{item.name}}</span>
                  <span class="time">{{item.time}}</span>
                </div>
                <div class="top-right">
                   <span class="collect"> 
                     <i class="iconfont">&#xe696;</i>
                     19
                   </span>
                   <router-link class="pinglun" tag="span" to="/replay">   
                     <i class="iconfont">&#xe621;</i>
                     666
                   </router-link>
                </div>
              </div>
              <router-link class="left-bottom" tag="p" to="/replay">
                {{item.content}}
              </router-link>
            </div>
          </li>
          <p class="read-more">展开更多评论</p>
        </ul>
      </div>
      <!-- 发布评论 -->
      <div class="publish">
      <input type="text" name="" v-model="body" placeholder="说的什么吧...">
        <div class="publish-right">
           <span @click="recommend"> <!-- 评论 -->
            <i class="iconfont">&#xe621;</i>
           </span>

           <span> <!-- 收藏 -->
            <i class="iconfont">&#xe60a;</i>
           </span>

           <span @click="forward"> <!-- 转发 -->
            <i class="iconfont">&#xe600;</i>
           </span>
        </div>
    </div>
    <!-- 转发 -->
    <div class="float" v-show="modelState" >
      <div class="model">
        <div class="icons">
          <mt-swipe :auto="0" :show-indicators="false">
              <mt-swipe-item class="swipe-item border-bottom" v-for="(page,index) of pages" :key="index" >
                <div class="icon " v-for="(item,id) of page" :key="item.id">
                  <div class="icon-img">
                    <img class="icon-img-content" :src="item.thumb|url" />
                    <p class="icon-keyword">{{item.name}}</p>
                  </div>
                </div>
              </mt-swipe-item>   
          </mt-swipe>
        </div>
        <ul class="copy">
          <li>
            <img src="https://imgsa.baidu.com/news/q%3D100/sign=9516dfe113178a82c83c7ba0c603737f/503d269759ee3d6d42cba2e64e166d224f4ade89.jpg">
            <p>复制链接</p>
          </li>
          <li>
            <img src="https://imgsa.baidu.com/news/q%3D100/sign=9516dfe113178a82c83c7ba0c603737f/503d269759ee3d6d42cba2e64e166d224f4ade89.jpg">
            <p>举报</p>
          </li>
        </ul>
        <span class="close" @click="close">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
export default {
  name: 'publish',
  props:{
    listId:String
  },
  data () {
    return {
    	  btnList:['最新评论','热门评论'],
        curId: 0,
        body:'',
        modelState:false,
        list:[
            {
              name: "学校",
              thumb: "images/2/2018/06/ivYSBQa94QAWaLFuRppavPRyawAqP4.png",
              weid: "108",
            },
            {
              name: "学校",
              thumb: "images/2/2018/06/ivYSBQa94QAWaLFuRppavPRyawAqP4.png",
              weid: "108",
            },
            {
              name: "学校",
              thumb: "images/2/2018/06/ivYSBQa94QAWaLFuRppavPRyawAqP4.png",
              weid: "108",
            },
            {
              name: "学校",
              thumb: "images/2/2018/06/ivYSBQa94QAWaLFuRppavPRyawAqP4.png",
              weid: "108",
            },
            {
              id: "1106",
              name: "学校",
              thumb: "images/2/2018/06/ivYSBQa94QAWaLFuRppavPRyawAqP4.png",
              weid: "108",
            }
        ],
        recommendList:[],

    }
  },
  methods: {
    tab (index) { //选项卡
      this.curId = index;
      console.log(this.curId)
      if(this.curId==0){

      }
    }, 
    forward(){ //转发
      this.modelState=true
    },
    close(){  //关闭
      this.modelState=false
    },
    handelClick(index){  //转发跳转
      console.log(this.refs[index])
      this.$router.push(this.refs[index])
    },
    getHomeInfo () {
      this.$axios.get('/index.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      console.log(res)
      res = res.data
      if( res.ret && res.data ) {
        const data = res.data
        // this.swiperList = data.swiperList
        this.list = data.iconList
      }
    },
    recommend(){//发表评论 
    console.log(this.listId)   
      
        var _this=this
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_comment',
            act:'comment',
            weid:this.$store.state.weid,
            newsid:_this.listId,
            openid:'o9K-84mN0qlnbl9zsiwIYg94aw9g',
            body:this.body       
          },
        }).then(res=>{                 
          this.body=''
          this.readRecommend()
          // this.recommendList=res.data.datas
        })
     
    },
    readRecommend(){ //查看评论
      console.log(this.listId)  
      var _this=this
        this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_review',
            act:'review',
            id:_this.listId,
            psize:8,
            weid:this.$store.state.weid,
            pindex:1       
          },
        }).then(res=>{                 
          this.recommendList=res.data.datas
          console.log(res)
      })
    },  
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
  created(){
    this.readRecommend()
    console.log(this.listId)
  }
}
</script>

<style lang="stylus" scoped>
// 评论
.line
  display block
  height 0.04rem 
  background red
  width .75rem
  position absolute
  bottom 0.12rem
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
    margin-right .45rem
    letter-spacing 1px
  .publish-right
    flex 1      
    span:nth-child(2)
      margin 0 .6rem 
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
        p
          color #000
          font-size  .2rem
          padding-top .1rem

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
</style>