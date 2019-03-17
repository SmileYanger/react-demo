<template>
  <div class="pagetop">
  <header-bar :title="title"></header-bar>
    <div class="activlist">
      <h3 class="activtitle">
      </h3>
      <h4 class="moreact"></h4>
      <div class="piclists">
        <div v-for="item in datalist" class="pl_list" @click="toDetailPage(item)">
          <div class="pl_sing">
            <img :src="item.thumb|url" class="pl_singlepic">
            <span class="pl_status">{{item.qk}}</span>
            <i class="iconfont">&#xe609;</i>
            <p class="pl_attractions">{{item.district}}</p>
          </div>
          <p class="pl_message">{{item.name}}</p>
          <p class="pl_item_info">
            <span class="pl_info_price">￥{{item.feiyong}}</span>
            <span class="pl_info_date">{{item.time}}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-show='loadPic' class="loadPic">
      <img src="@/assets/images/huodong.png">
      <p>暂无数据......</p>
    </div>
  </div>
</template>
<script>
  import HeaderBar from 'common/headerbar.vue'
  export default{
    components:{
      HeaderBar
    },
    name:'activlist',
    data(){
      return{
        title:"搜索列表",
        dataList:[],
        dataActivtyList:[],
        inquire:'',
        pages:this.pagenum,
        datalist:[],
        key:'',
        loadPic:false,
      }
    },
    methods:{
      toapply(){
        this.$router.push('/activityapply')
      },
      topage(){
        this.$router.push('/trailnotice')
      },
      getSearchInfo(){
        this.$router.push('/historicalfind')
      },
      getData(){
        this.key = this.$route.query.keywords
        console.log(123)
        console.log(this.$route.query.keywords)
        var _this=this
          this.$axios({  
            method: 'post',
            data:{
             do:'huodong_dim',
             act:'dim',   
             weid:2,
             page:2,
             psize:5,
             keywords:this.key
            },
          }).then(res=>{
            this.datalist = res.data.datas
            if(this.datalist.length==0){
              this.loadPic=true
            }
        })
      },
      //热门活动
      getListInfo(){
        this.$axios({
          method:'post',
          data:{
            do:'huodong_home',
            act:'home',
            page:this.pages,
            psize:4,
            weid:103
          }
        }).then(res=>{
          this.dataList = res.data.datas
          for (var i = 0; i < res.data.datas.length; i++) {
            this.inquire = res.data.datas[i].name
          }
        })
      },
      //活动列表
      getActivityInfo(){
        this.$axios({
          method:'post',
          data:{
            do:'huodong_activity',
            act:'activity',
            page:1,
            psize:8,
            weid:103
          }
        }).then(res=>{
          // console.log(res)
          this.dataActivtyList = res.data.datas
          for (var i = 0; i < res.data.datas.length; i++) {
            this.inquire = res.data.datas[i].name
          }

        })
      },
      toDetailPage(item){
        this.$router.push({path:'/activesearch',query:{Id:item.id}})
      }
    },
    mounted:function(){
      this.getData()
      this.getListInfo()
      this.getActivityInfo()
    },
    created:function(){
      this.getListInfo()
      this.getActivityInfo()
    }
  }
</script>
<style lang="stylus" scoped>
  .pagetop
    background #f6f6f6
    .headeract
      padding 0.48rem 0.35rem 0.2rem
      font-size 0.32rem
      color #000
      position relative
      text-align center
      height 0.6rem
      display flex 
      .searchmess 
        float right 
        height 0.6rem
        margin-left 0.2rem
        border-radius 0.3rem
        flex 1
        background #fff
        font-size 0.24rem
            input
          height 0.6rem
          font-size 0.24rem
          padding-left 0.1rem
          outline none
          width 86%
          vertical-align baseline
    .content
      background #fff
      height 2.24rem
      border-bottom-style inset
      border-bottom-width 0.15rem
      display flex
      .apply
        width 45%
        height 1.84rem
        margin-left 0.25rem
        margin-top 0.2rem
        margin-bottom 0.2rem
        background rgb(255,140,167)
        .imgapply
          padding-left 0.2rem
        .iapply
          margin-left 1.8rem
          font-size 0.32rem
        .spanapply
          border-width thin
          margin-left 1.9rem
          border-style solid
          border-color rgb(255,103,139)
          border-radius 0.3rem
          margin-right 0.54rem
          text-align center
          font-size 0.24rem
      .notice
        width 45%
        height 1.84rem
        margin-left 0.25rem
        margin-top 0.2rem
        margin-left 0.24rem
        margin-bottom 0.2rem
        background rgb(32, 108, 137)
        .imgnotice
          padding-left 0.2rem
        .inotice
          margin-left 1.8rem
          font-size 0.32rem
        .spanotice
          margin-left 1.9rem
          border-style solid
          border-color rgb(32, 148, 237)
          border-radius 0.3rem
          margin-right 0.54rem
          text-align center
          border-width thin
          font-size 0.24rem
    .hotactivity
      background #fff
      // height 8.8rem
      .toptitle
        text-align center
        font-size 0.32rem
        padding-top 0.2rem
        .one
          display inline-block
          width 0.3rem
          border-top 0.03rem solid #666 
        .hotact
          color rgb(51, 51, 51) 
          vertical-align sub
      .bottomcont
        text-align center
        color rgb(133, 133, 133)
        font-size 0.2rem
      .piclist
        width 100%
        // height 6.5rem
        .pic_list
          width 45%
          margin-bottom 0.2rem
          overflow hidden
          margin-left 0.25rem
          display inline-block
          .pic_sing
            position relative
            margin-bottom 0.02rem
            overflow hidden
            .singlepic
              width 3.38rem
              height 1.84rem
            .status
              position absolute
              top 0
              margin-left 0.15rem
              margin-top 0.15rem
              font-size 0.2rem
              background rgb(255, 72, 50)
            .iconfont
              position absolute
              top 0
              color rgb(255, 177, 54)
              margin-left 2.2rem
              margin-top 1.35rem
            .attractions
              position absolute
              color #fff
              margin-top 1.4rem
              top 0
              margin-left 2.5rem
              font-size 0.22rem
          .message
            position relative
            text-align left
            overflow hidden
            text-overflow ellipsis
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            display -webkit-box
          .item_info
            position relative
            .info_price
              font-size 0.32rem
              color rgb(255, 0, 0)
            .info_date
              font-size 0.2rem
              color rgb(133, 133, 133)
              float right
      .box_change
        // float left
        height 0.9rem
        width 100%
        border-top-style outset
        border-top-width 0.005rem
        margin-top 0.2rem
        border-bottom-style inset
        border-bottom-width 0.2rem
        .box_cha
          text-align center
          margin-top 0.2rem
          .iconfont
            color rgb(32, 148, 237)
          .exchange
            font-size 0.24rem
            color rgb(133,133,133)
    .activlist
      background #fff
      padding-top 1.28rem
      .activtitle
        text-align center
        font-size 0.32rem
        padding-top 0.2rem
        .actlist
          vertical-align sub
          color rgb(51, 51, 51)
        .onea
          display inline-block
          width 0.3rem
          border-top 0.03rem solid #666 
      .moreact
        text-align center
        color rgb(133, 133, 133)
        font-size 0.2rem
      .piclists
        background #fff
        .pl_list
          // position relative
          width 3.38rem
          margin-bottom 0.2rem
          overflow hidden
          margin-left 0.25rem
          display inline-block
          // float left
          .pl_sing
            position relative
            margin-bottom 0.02rem
            overflow hidden
            .pl_singlepic
              width 3.38rem
              height 2.1rem
            .pl_status
              position absolute
              top 0
              margin-top 0.15rem
              margin-left 0.15rem
              font-size 0.2rem
              background rgb(255, 72, 50)
            .iconfont
              position absolute
              top 0
              color rgb(255, 177, 54)
              margin-left 2.2rem
              margin-top 1.55rem
            .pl_attractions
              position absolute
              color #fff
              margin-top 1.6rem
              top 0
              margin-left 2.5rem
              font-size 0.22rem
          .pl_message
            position relative
            text-align left
            overflow hidden
            text-overflow ellipsis
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            display -webkit-box
          .pl_item_info
            position relative
            .pl_info_price
              font-size 0.32rem
              color rgb(255, 0, 0)
            .pl_info_date
              font-size 0.2rem
              color rgb(133, 133, 133)
              float right
    .load
      font-size 0.25rem
      font-weight lighter
      text-align center
    .loadPic
      transform translate(-50%, -50%)
      position absolute
      top 50%
      left 50%
      img
        width 3rem
        height 3rem
      p
        text-align center
        padding-top 0.3rem
                
            
          
      
</style>