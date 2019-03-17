<template>
<div class="box">
	<header-bar :title="title"></header-bar>
    <div class="banner">
      <img :src="pics.pic|url" class="banner-img">
      <div class="desc">
        <h2>{{sName}}</h2>
        <p>{{theme}}</p>
      </div>
    </div>
    <ul class="publicList" v-for="list in serviceList">
    	<li class="border-bottom" @click="goDetails(list.id)">
    		 <img :src="list.thumb|url">
    		 <div class="title">
    			 {{list.title}}
    		 </div>
    	</li>
    </ul>
</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
export default {
  name:'service',
  components:{
  	HeaderBar
  },

  data () {
    return {
    	title:'服务公众号列表页',
      sId:'',
      sName:'',
      theme:'',
      img:'',
      serviceList:[],
      pics:'',
      detail:'/detail'
    }
  },
  methods:{
    Goback(){
      this.$router.go(-1)
    },
     getData(){
      this.sId = this.$route.query.Id
      this.sName = this.$route.query.Name
      this.theme = this.$route.query.theme
    },
    // to='/publicdetails'
    goDetails(id){
      console.log(id)
      this.$router.push({path:'/publicdetails',query:{listId: id}})
      // this.$router.push('/artic')
    },
    //服务公众号列表
    getListInfo(){
      this.$axios({
          method:'post',
          data:{
            do:'fu_gzh',
            act:'xq',
            weid:2,
            weixinid:this.sId,
            page:2
          }
        }).then(res=>{
          this.serviceList = res.data.datas
          this.getPicInfo()
        })
      },
      //服务公众号图片
      getPicInfo(){
      this.$axios({
          method:'post',
          data:{
            do:'fu_gzh',
            act:'tu',
            weid:2,
            weixinid:this.sId,
            page:2

          }
        }).then(res=>{
          this.pics = res.data.datas
          /*console.log(111)
          console.log(res)*/
        })
      },
    },

    mounted:function(){
        this.getData()
        this.getListInfo()
        this.getPicInfo()
    }
}
</script>

<style lang="stylus" scoped>
@import "~styles/varibles.styl"
@import "~styles/mixins.styl"
.banner
  width 100%
  height 4.1rem
  position relative
  border-bottom .2rem solid #f6f6f6
  padding-top 1.28rem
  .banner-img
    width 1.5rem
    height 1.5rem
    border-radius 50%
    position absolute
    top 1.7rem
    left 0
    right 0
    margin 0 auto
  .desc
    width 100%
    height 1.2rem
    position absolute
    bottom .7rem
    text-align center
    letter-spacing 1px
    h2
      font-size .32rem
      color #333
      padding-top .3rem
    p 
      font-size .26rem
      color #666  
      padding-top .1rem
.publicList
  padding 0 0.25rem
  box-sizing border-box
  li
    height 1.8rem
    display flex
    align-items center
    padding .3rem 0
    letterSpaceing()
    img
      width 1.8rem
      height 1.4rem
      margin-right .22rem
    .title
      flex 1
      overflow hidden 
      height 1.4rem
      box-sizing border-box  
      color #333
      font-size .32rem
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow hidden
      display -webkit-box
      -webkit-box-orient vertical
      line-height .5rem
      -webkit-line-clamp 2
      border-bottom .3rem solid white
			
</style>