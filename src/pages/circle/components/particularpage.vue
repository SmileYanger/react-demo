<template>
    <div class="topmain">
      <div class="p_header">
        <i class="iconfont" @click="goback">&#xe671;</i>
        <span class="title">动态详情</span>
        <span class="iconfonts" @click.prevent="Complaint">&#xeee0;</span>
      </div>
      <div>
        <div class="particularPic" >
            <!-- 图片 -->
            <img :src="pagelist.avatar" class="p_avatar">
            <div class="p_info">
              <h3 class="p_infoname">{{pagelist.name}}</h3>
              <h4 class="p_infotime">{{pagelist.time}}</h4>
            </div>
            <p class="p_view">{{pagelist.body}}</p>
            <div class="singlepic" v-if="pagelist.pic_img.length==1">
              <img :src="pagelist.pic_img[0].pic|url" class="singlepic1">
            </div> 
            <ul class="pic_list" v-if='pagelist.pic_img.length>=2'>
              <li v-for="(eachpic,index) in pagelist.pic_img"><img :src="eachpic.pic|url"></li>
            </ul>
            <!-- 视频 -->
            <div v-if="pagelist.type =='vod'" class="ptv">
              <video :src="pagelist.vod|url"  class="vod" controls></video>
            </div>
        </div>
        <div class="foot_box">
            <div class="p_scan">
              <i class="iconfont"> &#xebcc;</i>
              <i>{{pagelist.yuedu}}</i>
              <h4 class="p_browse">浏览</h4>
            </div>
            <span class="p_mid_line"></span>
            <div class="p_scan">
              <!-- <i class="iconfont" @click="zan" v-if=> &#xe696;</i>  -->
              <i class="iconfont" @click="zan" v-if="zanState==true">&#xe696;</i>
              <i class="iconfont" style="color: orange" v-else>&#xe696;</i>
              <i>{{pagelist.zan_num}}</i>      
              <h4 class="p_browse">赞</h4>
            </div>
            <span class="p_mid_line"></span>
            <div class="p_scan">
              <i class="iconfont"> &#xe621;</i>
              <i>{{len}}</i>
              <h4 class="p_browse">评论</h4>
            </div>
        </div>
        <div class="tit_approve">
          <div class="approve">
              <img :src="pagelist.userzanimg|url" class="img_icon">
          </div>
          <i class="iconfont">&#xe666;</i>
          <i class="point">{{pagelist.zan_num}}人赞过</i>
        </div>
        <div class="allcom border-bottom">
          <span>全部评论({{len}})</span>
        </div>
        <div class="v_comment border-bottom" v-for="tem in pagelist.ping">
            <img :src="tem.img" class="v_avatar">
            <div class="v_info">
              <h3 class="v_infoname">{{tem.name}}</h3>
              <h4 class="v_infotime">{{tem.time}}</h4>
            </div>
            <div class="iconpos">
              <span>
                <i class="iconfont" @click='getZanInfo'>&#xe696;</i>
                <i>{{zdata.is_num}}</i>
              </span>
              <span>
                <i class="iconfont" @click="viewClick(tem)">&#xe621;</i>
              </span>
            </div>
            <p class="v_view" @click="viewClick(tem)">{{tem.body}}</p>
        </div>
      </div>
      <div class="bottom">
        <input type="text" name="comment" placeholder="说点什么吧..." v-model='commentText'>
        <div class="commit" @click="send">发送</div>
      </div>
      <div class="m_info_box" v-show="appear">
        <ul class="m_info_list" @click="plaint">
          <li>投诉</li>
        </ul>
        <ul class="m_info_list2" @click="concel">
          <li>取消</li>
        </ul>
      </div>
    </div>
</template>
<script>
  	export default{
      name:'partucularpage',
      data(){
        return{
          commentText:'',
          appear:false,
          pagelist:{},
          commentList:[],
          Id:'',
          len:'',
          tId:'',
          timg:'',
          tname:'',
          tbody:'',
          time:'',
          zdata:'',
          zanState:true,
          vod:''
        }
      },
  		methods:{
        goback(){
          this.$router.push("/circle")
        },
        viewClick(tem){
          this.$router.push({path:'/replyinfo',query:{tId:tem.openid,timg:tem.img,tname:tem.name,tbody:tem.body,time:tem.time}})
        },
        Complaint(){
          this.appear=true
        },
        plaint(){
          this.appear=false
        },
        concel(){
          this.appear=false
        },
        zan(){
          this.$axios({
            method:'post',
            data:{
              do:'quan_laud',
              act:'laud',
              weid:this.$store.state.weid,
              id:this.Id,
              openid:'o28cz01_UnZMfLNdjduWWuM0IT14'
            }
          }).then(res=>{
            console.log(res)
            this.getParticularInfo()
          })
        },
        //发送信息
        send(){
          this.$emit('commentSend',this.Id)
          this.$axios({
            method:'post',
            data:{
              do:'quan_comment',
              weid:this.$store.state.weid,
              openid:'o9K-84kr99h7cq8zBG8lBODU8DYg',
              act:'comment',
              body:this.commentText,
              pid:this.Id
            }
          }).then(res=>{
              this.getParticularInfo()
          })
        },
        getData(){
          this.Id=this.$route.query.Id
          this.vod=this.$route.query.vod
        },
        //获取详情信息
        getParticularInfo(){
          this.$axios({
            method:'post',
            data:{
              do:'quan_details',
              id:this.Id,
              act:'details'
            }
          }).then(res=>{
            this.pagelist = res.data.datas
            this.len = this.pagelist.ping.length
          })
        },
        //在评论点赞
        getZanInfo(){
          this.$axios({
            method:'post',
            data:{
              openid:'o8_g24_2b-M7-olvQLf51AJUfsSo',
              do:'quan_running',
              pinglunid:621,
              weid:13,
              act:'zan'
            }
          }).then(res=>{
            // console.log(res)
            this.zdata = res.data.datas
          })
        },
  		},
      mounted:function(){
        this.getData()
        // this.getListInfo()
        this.getParticularInfo() 
      },
      
  	}
</script>
<style lang="stylus" type="text/stylus">
  .topmain
    background #fff
    .p_header
      padding 0.48rem 0.35rem 0.2rem
      font-size 0.32rem
      position relative
      text-align center
      height 0.6rem
      background rgb(247, 246, 246)
      .iconfont
        float left
      .iconfonts
        float right
    .particularPic
      padding-top 0.2rem
      padding-left 0.25rem
      margin-right 0.25rem
      .singlepic
        padding-top 0
        .singlepic1
          width 100%
          height 3.57rem
      .pic_list
        max-width 100%
        overflow hidden
        & li
          float: left
          width 33.33%
          & img
            width 2.3rem
            height 2.3rem
            margin-right 0.05rem
            margin-bottom 0.05rem
      .p_avatar
          height 0.66rem
          width 0.66rem
          border-radius 50%
          margin-top 0.1rem
        .vod
          width 100%
          height 3.57rem
          background-color black
      .p_info
        display inline-block
        position absolute
        padding-left 0.2rem
        .p_infoname
          font-size 0.3rem
          font-weight lighter
        .p_infotime
          font-size 0.2rem
          font-weight lighter
      .p_view
        font-size 0.3rem
        color rgb(51, 51, 51)
        padding 0.4rem 0 0.3rem 0
    .foot_box
      border-color #e6e6e6    
      height 100%
      width 100%
      display flex
      align-item center
      padding-top 0.2rem
      border-bottom-style solid
      border-bottom-width 0.2rem
      padding-bottom 0.2rem
      .p_scan
        width 33.3%
        text-align center
        .p_iconfont
          width 0.4rem
          display inline-block
        .p_browse
          display inline-block
          font-size 0.24rem
      .p_mid_line
        -webkit-mask -webkit-linear-gradient(top,transparent,#000 30%,#000 70%,transparent 100%)
        width 1px
        background-color #e6e6e6
        height: 0.4rem
    .tit_approve
      padding 0.15rem 0.25rem 0.15rem 0.15rem
      border-bottom-style inset
      border-bottom-width 0.2rem
      .approve
        padding-left 0.1rem
        display inline-block
        .img_icon
          height 0.44rem
          width 0.44rem
          border-radius 50%
      i
        float right
      .point
        float right
        font-size 0.24rem
        color rgb(102, 102, 102)
    .allcom
      padding 0.2rem 0.25rem 0.2rem 0.25rem 
      span
        border-left 0.04rem solid #f00
        margin-left 0.1rem
        font-size 0.3rem
        padding-left 0.2rem
    .v_comment
      margin-top  0.2rem
      margin-left  0.25rem
      margin-right 0.25rem
      .v_avatar
          height 0.66rem
          width 0.66rem
          border-radius 50%
          margin-top 0.1rem
      .v_info
        display inline-block
        position absolute
        padding-left 0.2rem
        .v_infoname
          font-size 0.3rem
          font-weight lighter
        .v_infotime
          font-size 0.2rem
          font-weight lighter
      .v_view
        font-size 0.3rem
        color rgb(51, 51, 51)
        padding 0.4rem 0 0.3rem 0
        margin-left 0.8rem
      .iconpos
        float right
        .icon
          margin-right 0.4rem
    .bottom
      height 1.02rem
      position fixed
      bottom 0
      background rgb(252, 252, 252)
      width 100%
      input
        height 0.6rem
        width 5.9rem
        background rgb(247, 247, 247)
        margin-top 0.2rem
        margin-left 0.25rem
        border-radius 10%
      ::-webkit-input-placeholder
        color rgb(153, 153, 153)
        padding-left 0.4rem
      .commit
        font-size 0.3rem
        color rgb(133, 133, 133)
        float right
        margin-right 0.4rem
        margin-top 0.3rem
    .m_info_box
      height 2.02rem
      text-align center
      position fixed
      width 100%
      bottom 0
      font-size 0.3rem
      color rgb(51, 51, 51)
      .m_info_list
        border-bottom-style inset
        border-bottom-width 0.2rem
        height 0.91rem
        li
          padding-top 0.3rem
        
</style>