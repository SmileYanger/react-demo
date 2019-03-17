<template>
	<div>
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

    <div class="float" v-show="modelState" >
    	<div class="model">
    		<div class="icons">
					<mt-swipe :auto="0" :show-indicators="false">
					    <mt-swipe-item class="swipe-item border-bottom" v-for="(page,index) of pages" :key="index" >
								<div class="icon " v-for="(item,id) of page" :key="item.id">
									<div class="icon-img">
										<img class="icon-img-content" :src="item.imgUrl" />
										<p class="icon-keyword">{{item.desc}}</p>
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

  name: 'publishcomments',
 	props:{
    // refs: Array,
    listId:String
  },
  data () {
    return {
    	body:'',
    	modelState:false,
    	list:[],
      recommendList:[]
    
    }
  },
  methods:{
  	forward(){
  		this.modelState=true
  	},
  	close(){
  		this.modelState=false
  	},
  	handelClick(index){
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
      this.body=''
      this.publishcomments()
    },
    publishcomments(){
      var _this=this
        this.$axios({  
        method: 'post',
        data:{
         do:'xinwen_comment',
         act:'comment',
         weid:this.$store.state.weid,
         id:_this.listId,
         openid:'o9K-84mN0qlnbl9zsiwIYg94aw9g',
         body:this.body       
        },
        }).then(res=>{
            
          this.recommendList=res.data.datas
          console.log(this.recommendList)
          
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
  created(){
    this.publishcomments()
    // console.log('井元宝')
    // console.log(this.recommendList)
    // this.bus.$emit('',this.recommendList)
  },
  mounted () {
    this.getHomeInfo()
    // this.publishcomments()
    // console.log('井元宝')
     this.bus.$emit('',this.recommendList)
     console.log(this.recommendList)
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
	@import "~styles/mixins.styl"
// 发布评论
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