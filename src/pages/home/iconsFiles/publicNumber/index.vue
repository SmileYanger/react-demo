<template>
<div class="box">
	<header-bar :title="title"></header-bar>
	<div class="top">
        <div class="search-bar"> 
            <i  class="iconfont ">&#xe6c6;</i>
            <input type="search" placeholder="请输入你要搜索的关键词" @click="goHistorySearch">
        </div>
    </div>
    <ul class="publicList" v-for="service in serviceList">
    	<router-link class="border-bottom"  tag="li" :to="{path:'/publiclist',query:{Id:service.id,Name:service.name,theme:service.zhuti,img:service.pic}}">
    		<img :src="service.pic|url">
    		<div class="desc">
    			<h2>{{service.name}}<i class="time">{{service.update_time}}</i></h2>
    			<p>{{service.zhuti}}</p>
    		</div>
    	</router-link> 
    </ul>
</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
export default {
  components:{
  	HeaderBar,
  },

  data () {
    return {
    	title:'服务公众号',
      serviceList:[],
      Id:'',
      Name:'',
      theme:'',
      img:''
    }
  },
  methods:{
    Goback(){
      this.$router.push('/')
    },
    goHistorySearch(){
      this.$router.push('./historicalSearch')
    },
    getServiceInfo(){
        this.$axios({
          method:'post',
          data:{
            do:'fu_gzh',
            act:'list',
            weid:this.$store.state.weid,
            page:1
          }
        }).then(res=>{
          // console.log(res)
          this.serviceList = res.data.datas
        })
    },
  },
  mounted:function(){
    this.getServiceInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/varibles.styl"
@import "~styles/mixins.styl"
.top
  padding .2rem .35rem
  font-size .32rem
  color #000
  position relative
  text-align center
  letterSpaceing()
  height .6rem
  display flex  
  background-color #f6f6f6  
  padding-top 1.52rem
  .iconfont
    line-height .6rem
  .search-bar
    height .6rem
    background green
    float right
    flex 1
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
.publicList
	padding 0 0.25rem
	box-sizing border-box
	li
		height 1.4rem
		display flex
		align-items center
		padding .2rem 0
		letterSpaceing()
		img
			width 1rem
			height 1rem
			margin-right .2rem
			border-radius .06rem
		.desc
			flex 1
			width 100%
			overflow hidden 
			height 1.1rem
			box-sizing border-box
			position relative
			h2
				font-size .32rem
				color #000
				position absolute
				top 0.05rem
				width 100%
				.time
					float right
					font-size .24em
					color #aaa
			p				
				position absolute
				bottom 0rem
				width 100%
				ellipsis()
				font-size .28rem
				color #999
    	   
</style>