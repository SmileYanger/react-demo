<template>
<div class="box">
	<swiper :lunBoImg='isSwiper'></swiper>
	<div class="back">
		 <i class="iconfont" @click="Goback">&#xe671;</i>
	</div>
	<div class="desc">
		<h2 class="border-bottom">{{detailsPage.name}}</h2>
		<p class="border-bottom">
			<i>时间</i>
			{{detailsPage.yingye}}
		</p>
		<p class="border-bottom">
			<i>电话</i>
			{{detailsPage.tel}}
		</p>
		<p >
			<i>地址</i>
			{{detailsPage.address}}
		</p>
	</div>
	<div class="descript">
		<div class="title border-bottom">
			<span>景区介绍</span>
		</div>
		<p v-for="(item,index) in detailsPage.body" :key="index">
			{{item.body}}
		</p>
	</div>
	<div class="comment">
		<div class="title border-bottom">
			<span>精彩评论</span>
		</div>
		<ul>
			<li class="border-bottom" v-for="(item) in commentList" :key="item.id">
				<img :src="item.avatar">
				<div class="left">
					<p>
						<span class="name">{{item.name}}</span>
						<span class="time">{{item.time}}</span>
					</p>
					<div>{{item.content}}</div>
				</div>
			</li>
		</ul>
		<p class="read-more border-bottom">查看全部评论</p>
	</div>
	<div class="footer">
		<input type="text" v-model="commentary" placeholder="说点什么吧....">
		<span @click="fullCommentary">发送</span>
	</div>
</div>
</template>

<script>
import Swiper from '../components/Carousel'
export default {

  name: 'hotdetails',
  components:{
  	Swiper
  },
  data () {
    return {
		businessId:'', //商家id
		detailsPage:'', //商家详情页 
		commentList:'', //评论详情列表
		isSwiper:[], //商家详情页论图
		commentary:'',
		userId:'' //用户id
    }
  },
  created () {
	console.log(this.$route.query.id)
	this.businessId = this.$route.query.id
	this.getDetailsPage()  // 根据id获取详情页数据
	this.getCommentList() //根据商家id获取评论	
  },
  methods:{
  	 Goback(){
      this.$router.go(-1)
	},
	// 根据id获取详情页数据
	async getDetailsPage(){
		const {data:res} = await this.$axios({
			method: "post",
			data:{
				do:'merchant_xq',
				id:this.businessId
			}
		})
		if(res.code !== '200') return console.log("请求数据失败");
		this.detailsPage = res.datas
		this.isSwiper = res.datas.lunbo
		console.log(res);
	},
	//根据商家id获取评论
	async getCommentList(){
		const {data:res} = await this.$axios({
			method:'post',
			data:{
				do:'merchant_pl',
				shopid: this.businessId,
				page: 1
			}
		})
		this.commentList = res.datas
	},
	//发送相关评论
	async fullCommentary(){
		const {data:res} = await this.$axios({
			method:'post',
			data:{
				do:'merchant_comment',
				openid : 'o8_g245qfqFOa6sS14fAOsrnuHLo',  //用户id  需要形参
				weid: this.$store.state.weid,
				shopid: this.businessId,  //商家ID
				content: this.commentary   //评论内容
			}
		})
		if(res.code !== '200')  return console.log("发送评论失败");
		this.commentary = '';
		this.getCommentList()
	}
  },
  mounted() {
	  
  },
}
</script>

<style lang="stylus" scoped>
.box
	background-color #f6f6f6
	position relative
	.back
		position absolute
		width .6rem
		line-height .6rem
		background-color rgba(0, 0, 0, .3)
		border-radius 50%
		top .3rem
		left .25rem
		z-index 99
		text-align center
		color white
	.desc
		padding 0 .25rem
		box-sizing border-box
		background-color white
		letter-spacing 1px
		h2
			line-height 1rem
			font-size .34rem
			color #212121
			font-weight bold			
		p
			line-height .72rem
			font-size .26rem
			color #333
			i
				color #999
				padding-right .4rem
	.descript,
    .comment
		margin .2rem 0
		background-color white		
		.title
			line-height .8rem
			box-sizing border-box				
			padding 0 .25rem
			span
				border-left 2px solid red
				padding-left .2rem
				font-size .34rem
				color #212121
				letter-spacing 1px
				font-weight bold
		p		
			font-size .26rem
			color #999
			padding .3rem .25rem
			box-sizing border-box	
			line-height .48rem
			letter-spacing 1px
		ul	
			padding 0 .25rem
			box-sizing border-box
			li
				display flex 
				padding .3rem 0
				box-sizing border-box
				img
					width .72rem
					height .72rem
					border-radius 50%
					margin-right .22rem
				.left
					p	
						padding 0
						.name
							color #4a87da
						.time
							float right
					div
						padding-top .1rem
						font-size .28rem
						color #333
						letter-spacing 1px
		.read-more
			line-height .82rem
			font-size .24rem
			color #999
			text-align center
			margin-bottom 1rem
	.footer
		display flex
		padding .2rem .25rem
		box-sizing border-box
		background-color white
		position fixed
		bottom 0
		width 100%
		input
			flex 1
			margin-right .44rem
			line-height .6rem
			border-radius .3rem
			padding-left .2rem
			background-color #f6f6f6
			font-size .24rem
			color #999
			letter-spacing 1px
		span
			line-height .6rem
</style>