<template>
	<div class="wapper">
		<swiper :bannerImg="bannerImg"></swiper>
		<search class='searchBar'></search>
		<div class="boxer">
			<div class="news">
				<div class="news-left">
					<div class="title">最新入驻</div>
					<div class="detial">国美电器成功入驻扶风商圈安徽拨付给发</div>
					<div class="tip">
						<div>5折狂欢购</div>
						<div>最高减1000元</div>
					</div>
				</div>
				<router-link class="news-right" tag="div" to="/hotenter">我要入驻</router-link>
			</div>
		</div>
		<icons :iconList="iconList" :refs="refs" class="icons-box"></icons>
		<!-- 热门商家 -->
		<hot :newHotBus='newHotBus'></hot>
        <!-- 列表 -->
		<m-swiper class='mt20' :newHotBus='newHotBus'  @HotBusiness='HotBusiness'></m-swiper>
	</div>
</template>

<script>
import Search from './components/search.vue'
import Hot from './components/hot.vue'
import Swiper from 'common/Carousel'
import Icons from './components/Icons'
import MSwiper from './components/tabswiper.vue'

export default {
  title: 'list',
  components: {
  	Search,
  	Swiper,
  	Icons,
  	Hot,
  	MSwiper
  },
  data () {
    return {
    	refs:[
			'/iconlist',
			],
    	iconList:[],  //icons
		bannerImg:[], //banner图片
		newHotBus:[],  //最新 最热 最近 数据
		getIndex:'', 
		oplat:'',
		oplng: '',
    }
  },
  created () {
	//   获取bnner图
	  this.getBanner()
	//   获取导航数据
	  this.getIconList()
	//   子组建传向父组件的值
	//   this.getHotBus()
	  this.HotBusiness()
	 let op  =  localStorage.getItem('op')
	 let array = op.split(',')
	 console.log(array);
	 for(var i = 0; i < array.length; i++){
		 this.oplat = array[0]
		 this.oplng = array[1]
	 }
  },
   methods: {
	HotBusiness(val){
		console.log(val);
		if(val === undefined || val === 0 ){
			this.getIndex = ''
			this.getHotBus()
		}else if(val === 1){
			this.getIndex = 'new'
			this.getHotBus()
		}else if(val === 2){			
			this.getNearbyBus()
		}
	},
	// banner
	async getBanner(){
		const {data:res} = await this.$axios({
			method:'post',
			data:{
				do:'merchant',
				act:'shop_swiper',
				weid:this.$store.state.weid
			}
		})
		if(res.code !== '200') return console.log(res.msg);
		
		this.bannerImg = res.datas
	},
	// 获取导航数据
	async getIconList(){
		const {data:res} = await this.$axios({
			method:'post',
			data:{
				do:'merchant',
				act:'nav',
				weid: this.$store.state.weid
			}
		})
		if(res.code !== '200') return console.log("请求数据失败");
		this.iconList = res.datas
	},
	 //获取热门商家数据
	  async getHotBus(){
		  const {data:res} = await this.$axios({
			  method:'post',
			  data:{
				  do:'merchant',
				  type:this.getIndex,
				  weid:this.$store.state.weid,
				  page:1,
				  psize:5
			  }
		  })
		// console.log(res);
		if(res.code !== '200') return this.newHotBus=[];
		this.newHotBus = res.datas
		// console.log(this.newHotBus);
	  },

	// 获取附件商家
	async getNearbyBus(){
		 const {data:res} = await this.$axios({
			  method:'post',
			  data:{
				  do:'merchant',
				  type:'nearby',
				  weid:this.$store.state.weid,
				  page:1,
				  psize:5,
				  lng:this.oplng,
				  lat:this.oplat
			  }
		  })
		  console.log(res);
		  if(res.code !== '200') return this.newHotBus=[];
			this.newHotBus = res.datas
	}
  },
   mounted () {
	//   页面加载 获取最新 最热 最近 数据	
	// this.getHotBus()
  },
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
  // carousel组件相关
.wapper
	position relative
.searchBar
	position absolute
	top .48rem
	z-index 99
	width 100%
.wapper >>> .mint-swipe
	height 3.60rem
.wapper >>> .mint-swipe-indicators
  	.mint-swipe-indicator
	    width 13px
	    height 4px
	    border-radius 2px
	    background-color #FFF
	    opacity 1
  	.is-active
	    vertical-align bottom
	    width 8px
	    height 8px
	    border-radius 50%
	    border 4px solid #fe9b26
    	background-color rgba(0, 0, 0, 0.1)
	.wapper
		background-color #f6f6f6
		.boxer
			width 100%
			height 1.70rem
			display flex
			justify-content center
			position relative
			left 0
			z-index 99
			margin-top -.35rem
			margin-bottom .3rem           
			.news
				width 7rem
				height 1.82rem
				background-color #fff
				border-radius 5px
				padding 0.2rem 0.4rem
				box-sizing border-box
				display flex
				justify-content space-between
				align-items center
				.news-left
					display flex
					width 4.2rem
					flex-direction column
					border-right 1px dashed #ccc
					padding-right 0.4rem
					box-sizing border-box
					.title
						font-size 0.38rem
						color #ff424b
						font-weight bold
						letter-spacing 1px
					.detial
						font-size 0.28rem
						color #666
						ellipsis()
					.tip
						display flex
						text-align center
						margin-top 0.16rem
						:first-child,:last-child
							border-radius 3px 0 3px 3px
							background: -webkit-linear-gradient(left, #ffbf3f , #fd9122); /* Safari 5.1 - 6.0 */
							background: -o-linear-gradient(right, #ffbf3f , #fd9122); /* Opera 11.1 - 12.0 */
							background: -moz-linear-gradient(right, #ffbf3f , #fd9122); /* Firefox 3.6 - 15 */
							background: linear-gradient(to right, #ffbf3f , #fd9122); /* 标准的语法（必须放在最后） */
							color #fff
							height 0.3rem
							line-height 0.3rem
							font-size 0.2rem
							padding .05rem
						:first-child
							margin-right 0.16rem
				.news-right		
					margin-left 0.4rem
					width 1.5rem
					height 0.65rem
					line-height 0.65rem
					text-align center
					background: -webkit-linear-gradient(left, #ff747b , #ff434c); /* Safari 5.1 - 6.0 */
					background: -o-linear-gradient(right, #ff747b , #ff434c); /* Opera 11.1 - 12.0 */
					background: -moz-linear-gradient(right, #ff747b , #ff434c); /* Firefox 3.6 - 15 */
					background: linear-gradient(to right, #ff747b , #ff434c); /* 标准的语法（必须放在最后） */
					color #fff
					border-radius 0.1rem
		.mt20
			margin-top 0.2rem
</style>