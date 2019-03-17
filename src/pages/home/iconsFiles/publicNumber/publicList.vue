<template>
<div class="box">
	<header-bar :title="title"></header-bar>
  <div class="p_top">
    <ul class="publicList" v-for="service in datalist">
    	<router-link class="border-bottom"  tag="li" :to="{path:'/publiclist',query:{Id:service.id,Name:service.name,theme:service.zhuti,img:service.pic}}">
    		<img :src="service.pic|url">
    		<div class="desc">
    			<h2>{{service.name}}<i class="time">{{service.id}}</i></h2>
    			<p>{{service.zhuti}}</p>
    		</div>
    	</router-link> 
    </ul>
  </div>
  <div v-show='loadPic' class="loadPic">
    <img src="@/assets/images/huodong.png">
    <p>暂无数据......</p>
  </div>
</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
export default {
  name:'publiclist',
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
      img:'',
      datalist:'',
      key:'',
      loadPic:false
    }
  },
  methods:{
    //模糊查询
    getData(){
      this.key = this.$route.query.keywords
      console.log(this.key)
      var _this=this
          this.$axios({  
            method: 'post',
            data:{
             do:'gzh_search',
             act:'gzh',   
             weid:2,
             page:1,
             psize:3,
             keywords:this.key
            },
          }).then(res=>{
            this.datalist = res.data.datas
            console.log(this.datalist.length)
            if(this.datalist.length==0){
              this.loadPic=true
            }
        })
    },
    getServiceInfo(){
        this.$axios({
          method:'post',
          data:{
            do:'fu_gzh',
            act:'recommend',
            weid:2
          }
        }).then(res=>{
          // console.log(res)
          this.serviceList = res.data.datas
        })
    },
  },
  mounted:function(){
    this.getServiceInfo()
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/varibles.styl"
@import "~styles/mixins.styl"
.p_top
  padding-top 1.28rem
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
  padding-top 1.28rem 
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