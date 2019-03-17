<template>
	<div class="pagetop">
		<div class="headeract">
			<div class="iconfont" @click="goback">&#xe671;</div>
			<div class="searchmess">
				<span class="iconfont">&#xe6c6;</span>
				<input type="text" class="searchmes" placeholder="搜索农业/商业/房产等信息" @click="getSearchInfo">
			</div>
		</div>
		<div class="content">
			<div class="apply">
				<img src="" class="imgapply">
				<h3 class="iapply">活动报名</h3>
				<h4 class="spanapply" @click="toapply">GO</h4>
			</div>
			<div class="notice">
				<img src="" class="imgnotice">
				<h3 class="inotice">活动预告</h3>
				<h4 class="spanotice" @click="topage">GO</h4>
			</div>
		</div>
		<div class="hotactivity">
			<h3 class="toptitle">
				<span class="one"></span>
				<span class="hotact">热门活动</span>
				<span class="one"></span>
			</h3>
			<h4 class="bottomcont">为您推荐最热门的活动</h4>
			<div class="piclist">
				<div v-for="item in dataList" class="pic_list" @click="toDetailPage(item)">
					<div class="pic_sing">
						<img :src="item.thumb|url" class="singlepic">
						<span class="status">{{item.qk}}</span>
						<i class="iconfont">&#xe609;</i>
						<p class="attractions">{{item.district}}</p>
					</div>
					<p class="message">{{item.name}}</p>
					<p class="item_info">
						<span class="info_price">￥{{item.yuedu}}</span>
						<span class="info_date">{{item.time}}</span>
					</p>
				</div>
			</div>
			<div class="box_change">
				<div class="box_cha" @click="exchange">
					<span class="iconfont">&#xe7b1;</span>
					<span class="exchange">换一换</span>
				</div>
			</div>
		</div>
		<div class="activlist">
			<h3 class="activtitle">
				<span class="onea"></span>
				<span class="actlist">活动列表</span>
				<span class="onea"></span>
			</h3>
			<h4 class="moreact">更多活动等你的参与</h4>
			<div class="piclists">
				<div v-for="item in dataActivtyList" class="pl_list" @click="toDetailPage(item)">
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
		<div class="load">点击加载更多</div>
	</div>
</template>
<script>
	export default{
		name:'hotactivity',
		data(){
			return{
				dataList:[],
				dataActivtyList:[],
				inquire:'',
				pages:this.pagenum,
			}
		},
		methods:{
			goback(){
				this.$router.push("/")
			},
			toapply(){
				this.$router.push('/activityapply')
			},
			topage(){
				this.$router.push('/trailnotice')
			},
			getSearchInfo(){
				this.$router.push('/historicalfind')
			},
			//换一换
			exchange(){
				this.pagenum = Math.floor(this.dataList.length/4)+1;
				this.pages = this.pagenum;
				// console.log(this.pages)
				this.getListInfo()
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
			/*//模糊查询
			getSearchInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_dim',
						act:'dim',
						weid:108,
						psize:1,
						page:2,
						keywords:'展览'
					}
				}).then(res=>{
					console.log(res)
				})
			},*/
			toDetailPage(item){
				this.$router.push({path:'/activesearch',query:{Id:item.id}})
			}
		},
		mounted:function(){
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
								
						
					
			
</style>