<template>
  <div class="top_circle">
    <div class="box-circle">
      <div class="title">圈子</div>
    </div>
    <div class="card" v-for="item in dataList">
      <div class="card_main">
          <header class="card_head">
            <div class="card_image">
              <img :src="item.avatar" class="card_image1">
            </div>
            <div class="n_text">
              <a class="n_textcom1">{{item.name}}</a>
              <div class="n_textcom2">{{item.time}}</div>
            </div>
          </header>
      </div>
    <section class="text_content">
      <div v-if="item.type=='pic'" class="ptv">
        <div class="text_con">
          <span @click="particular(item)">{{item.body}}</span>
        </div>
        <div class="singlepic" v-if="item.pic_img.length===1">
          <img :src="item.pic_img[0]|url">
        </div> 
        <ul class="pic_list" v-if="item.pic_img.length>=2">
          <li v-for="(eachpic,index) in item.pic_img">
            <img :src="eachpic|url">
          </li>
        </ul>
      </div>
      <div v-if="item.type=='text'" class="ptv">
          <span @click="particular(item)">{{item.body}}</span>
      </div>
      <div v-if="item.type=='vod'" class="ptv">
        <span @click="particular(item)">{{item.body}}</span>
        <video :src="item.vod|url"  class="vod" controls>
        </video>
      </div>
    </section>
    <footer class="footer_top">
        <div class="scan">
          <i class="iconfont image1"> &#xebcc</i>
          <i>{{item.yuedu}}</i>
          <h4 class="browse">浏览</h4>
        </div>
        <span class="mid_line"></span>
        <div class="scan">
          <i class="iconfont image1"> &#xe696;</i>  
          <i>{{item.zan_num}}</i>     
          <h4 class="browse">赞</h4>
        </div>
        <span class="mid_line"></span>
        <div class="scan" @click='particular(item)'>
          <i class="iconfont image1"> &#xe621;</i>
          <i>{{item.ping_num}}</i>
          <h4 class="browse">评论</h4>
        </div>
    </footer>
    </div>
    <div class="camera" v-show="cameraPic">
      <img src="@/assets/images/shipin@2x.png" class="imgPos" @click="iconlive">
    </div>
    <div class="model" v-show="golink">
      <ul class="threePic" >
        <li>
          <i class="g_text">文字</i>
          <img src="@/assets/images/wenzi@2x.png" class="imgText" @click="wenzi">
        </li>
        <li>
          <i class="g_picture">图片</i>
          <img src="@/assets/images/tupian@2x.png" class="imgPic" @click="picture">
        </li>
        <li>
          <i class="g_voide">视频</i>
          <img src="@/assets/images/shipin@2x.png" class="imgVoid" @click="video">
        </li>
        <li>
          <img src="@/assets/images/guanbi@2x.png" class="imgCancel" @click="cancel">
        </li>
      </ul>
    </div>
    <tabbar></tabbar>
    <release v-show="showModel"></release> 
  </div>
</template>
<script>
  import Tabbar from 'common/Tabbar'
  import Release from '@/pages/release/Release'
  import Vue from 'vue'
  let bus = new Vue();
  export default {
    name: 'myCircle',
    components: {
      Tabbar,
      Release
    },
    data() {
      return {
        golink:false,
        cameraPic:true,
        showModel:'',  
        dataList:[],  
        type:'' ,
        vod:'',
        isScale:false,
      }
    },
   methods:{
    //圈子主页信息
    getCircleInfo(){
      this.$axios({
        method:'post',
        data:{
          do:'quan',
          act:'quan',
          weid:this.$store.state.weid,
          // weid:108,
          page:1
        }
      }).then(res=>{
        console.log(res)
        this.dataList = res.data.datas
        for (var i = 0; i < res.data.datas.length; i++) {
          this.type = res.data.datas[i].type
        }
      })
    },
    particular(item){
      this.$router.push({path:'/particularpage',query:{Id:item.id,vod:item.vod}})
    },
    iconlive(){
      this.golink=true,
      this.cameraPic=false
    },
    cancel(){
      this.golink=false,
      this.cameraPic=true
    },
    wenzi(){
      this.$router.push('/text')
      this.cameraPic = true
      this.golink=false
    },
    picture(){
      this.$router.push('/picpublish')
      this.cameraPic = true
      this.golink=false
    },
    video(){
      this.$router.push('/upvideo')
      this.cameraPic = true
      this.golink=false

    },
    imgBig(){
      this.isScale = !this.isScale
    },
  },
    mounted:function(){
      this.getCircleInfo()
      var _this=this
      this.bus.$on('',function(value){
        _this.showModel=value
      })      
    },
  }
</script>

<style lang="stylus" type="text/stylus">
    .box-circle
      width 100%
      height 1.2rem
      position relative
      top 0px
      background rgb(246, 246, 246)
      .title 
        text-align center
        font-size 0.4rem
        font-weight: bolder
        padding-top 0.3rem
    .card
      background white
      .card_head
        display flex
        .card_image
          display flex
          position relative
          margin-top 0.2rem
          margin-left 0.25rem
          .card_image1
            height 0.66rem
            width 0.66rem
            border-radius 50%
            display block
            vertical-align top
        .n_text
          display flex
          padding 0.2rem 0 0.4rem 0.25rem
          justify-content center
          flex-direction column
          position relative
          line-height 0.35rem
          .n_textcom1
            font-size 0.3rem
          .n_textcom2
            font-size 0.2rem
    .text_content
      padding-left 0.2rem
      padding-right 0.2rem 
      padding-bottom 0.3rem
      .ptv
        background #fff
        .text_con
          font-size 0.3rem
        .singlepic
          padding-top 0.3rem
          img
            width 100%
            height 3.57rem
            transform scale(1)
            transition all ease 0.2s  
          img scale 
            transform scale(1.5)
            position absolute
            z-index 100
        .vod
          width 100%
          height 3.57rem
          background-color black
        .pic_list
          margin-top 0.4rem
          max-width 100%
          overflow hidden
          li
            float: left
            width 33.33%
            img 
              width 2.3rem
              height 2.3rem
              margin-right 0.05rem
              margin-bottom 0.05rem
              transform scale(1)
              transition all ease 0.2s
            img.scale 
              transform scale(1.5)
              position absolute
              z-index 100
            /*img
              width 2.3rem
              height 2.3rem
              margin-right 0.05rem
              margin-bottom 0.05rem*/
      
    .footer_top
      border-color #e6e6e6    
      border-top-style solid
      height 100%
      width 100%
      display flex
      align-item center
      border-width 0.01rem
      padding-top 0.2rem
      border-bottom-style solid
      border-bottom-width 0.2rem
      padding-bottom 0.2rem
      .scan
        width 33.3%
        text-align center
        font-size 0.24rem
        .image1
          width 0.4rem
          display inline-block
        .browse
          display inline-block
      .mid_line
        -webkit-mask -webkit-linear-gradient(top,transparent,#000 30%,#000 70%,transparent 100%)
        width 1px
        background-color #e6e6e6
        height: 0.4rem
    .camera
      position fixed
      width 100%
      bottom 0
      margin-bottom 1.48rem
      .imgPos
        width 0.9rem
        margin-left 6.2rem
    .model
      position fixed
      top 0
      bottom 0
      right 0
      left 0
      z-index 99
      background rgba(0, 0, 0, .5)
      .threePic
        position absolute
        bottom 1.48rem
        right .4rem
        line-height 1.2rem
        font-size 0.24rem
        color rgb(255, 255, 255)
        i
          margin-right 0.25rem
        .imgText
          width 0.9rem
        .imgPic
          width 0.9rem
        .imgVoid
          width 0.9rem
        .imgCancel
          width 0.9rem
          margin-left 0.8rem
</style>
