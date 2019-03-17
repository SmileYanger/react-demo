<template>
	<div class="box">
		<div class="s_header">
			<i class="iconfont" @click="goback">&#xe671;</i>
			<span class="title">活动详情</span>
			<span class="iconfonts">&#xeee0;</span>
		</div>
		<div class="totlePage" v-for="item in detailData">
			<div class="pagedetail">
				<img :src="item.thumb|url" class="pagePic">
				<p class="message">{{item.name}}</p>
				<p class="price">￥{{item.feiyong}}</p>
				<div class="viewpage">
					<i class="iconfont">&#xebcc;</i>
					<span>{{item.yuedu}}浏览</span>
				</div>
				<div class="viewtime">
					<i class="iconfont">&#xe60a;</i>
					<span>{{item.shou_counting}}次</span>
				</div>
			</div>
			<div class="detaildata">
				<div>
					<span class="font">活动人数:</span>
					<span class="fontd">{{item.renshu}}</span>
				</div>
				<div>
					<span class="font">已报名:</span>
					<span class="fontd">{{item.counting_join}}</span>
				</div>
				<div>
					<span class="font">剩余名额:</span>
					<span class="fontd">{{item.shengyu}}</span>
				</div>
				<div>
					<span class="font">报名时间:</span>
					<span class="fontd">{{item.bm_time}}</span>
				</div>
				<div>
					<span class="font">电话:</span>
					<span class="fontd">{{item.tel}}</span>
				</div>
				<div>
					<span class="font">地点:</span>
					<span class="fontd">{{item.address}}</span>
					<span class="iconfont">&#xe666;</span>
				</div>
			</div>
			<div class="applyNum">
				<span class="" v-for="(single,index) in item.pic"><img :src="single.picture|url" class="imgApply"></span>
				<span class="iconfont">&#xe666;</span>
				<span class="serverNum" @click="applyperson(item)">{{item.counting_join}}人报名</span>
			</div>
			<div class="activDetil">
				<p class="actitle">活动详情</p>
				<p class="content" v-html='item.body'></p>
				<p class="moreDetil" @click="viewMessage(item)" v-show = "message">查看更多信息</p>
			</div>
			<div class="viewComment">
				<span class="comment">全部评论({{commentNum}})</span>
				<div v-for="comment in commentData">
					<div class="commentInfo">
						<div class="v_page"><img :src="comment.openImg|url" class="avatar"></div>
						<div class="v_info">
							<h3 class="v_infoname">{{comment.openName}}</h3>
							<h4 class="v_infotime">{{comment.time}}</h4>
						</div>
						<div class="v_prcomment"> 
							<div class="v_praise">
								<span class="iconfont" @click="getZanInfo(comment)">&#xe696;</span>
								<span class="praiseNum">{{comment.zan}}</span>
							</div>
							<!-- <div class="v_comment">
								<span class="iconfont">&#xe621;</span>
								<span class="commentNum">{{comment.id}}</span>
							</div> -->
						</div>
					</div>
					<div class="remark">{{comment.content}}</div>
				</div>
			</div>
			<div class="bots">加载请等候</div>
		</div>
		<div class="footer" v-show="footer">
			<span class="footer_cont">
				<h3 class="iconfont" @click='getCollection'>&#xe60a;</h3>
				<h4 class="f_cont">收藏</h4>
			</span>
			<span class="footer_comment">
				<h3 class="iconfont" @click="pcomment">&#xe641;</h3>
				<h4 class="f_comment">评论</h4>
			</span>
			<div class="apply" @click='signup' v-show='readyapply'>
				<i>报名</i>
			</div>
			<div class="apply" @click='capply' v-show='apply' style="background-color: #C0C0C0">
				<i>已报名</i>
			</div>
		</div>
		<div class="bottom" v-show="bottom">
	        <input type="text" name="comment" placeholder="说点什么吧..." v-model='commentText'>
	        <div class="commit" @click="send">发送</div>
      	</div>
      	<Alert :alertTip="alert" v-show='alertJoin'></Alert>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Alert from 'common/alert'
	Vue.prototype.bus=new Vue()
	export default{
		name:'searchmessage',
		components:{
			Alert
		},
		data(){
			return{
				Id:'',
				commentData:[],
				detailData:[],
				footer:true,
				bottom:false,
				commentText:'',
				commentNum:'',
				message:false,
				zanId:'',
				readyapply:true,
				apply:false,
				alertJoin:false,
				alert:'你已经参加过了',
			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			viewMessage(item){
				this.$router.push({path:'/moreinfo',query:{body:item.body}})
			},
			applyperson(item){
				this.$router.push({path:'/memberlist',query:{Id:item.id}})
			},
			//点击评论
			pcomment(){
				this.footer=false
				this.bottom=true
			},
			//发送评论
			send(){
				this.$axios({
				method:'post',
				data:{
					do:'huodong_details',
					act:'pinglun',
					id:this.Id,
					uniacid:2,
					content:this.commentText,
					openid:'o9K-84qRWHf4MSPhXXRPgyi8ngdo'
				}
				}).then(res=>{
					// console.log(res)
					this.getCommentInfo()
					this.bottom=false
					this.footer=true
				})
			},
			//获取页面详情信息
			getMessageInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_details',
						act:'details',
						id:this.Id,
						weid:103,
						openid:'o8_g24y5hUM58628G7txtU29MKzM'
					}
				}).then(res=>{
					console.log(res.data.datas)
					this.detailData = res.data.datas
					for (var i = 0; i < res.data.datas.length; i++) {
						this.body = res.data.datas[i].body
						if(this.body>28){
							this.message = true
						}
					}
				})
			},
			//获取评论信息
			getCommentInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_details',
						act:'ping',
						id:this.Id,
						weid:103,
						page:1,
						psize:2,
						openid:'o8_g248C_85bM83cqJ1OiIPW9Elc'
					}
				}).then(res=>{
					this.commentData = res.data.datas
					for (var i = 0; i < res.data.datas.length; i++) {
						this.zanId = res.data.datas[i].id
					}
					this.commentNum = res.data.datas.length
				})
			},
			//点击报名
			signup(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_details',
						act:'baoming',
						id:this.Id,
						weid:103,
						blei:2,
						openid:'o8_g24y5hUM58628G7txtU29MKzM'
					}
				}).then(res=>{
					console.log(res)
					if(res.data.code == 400){
						this.alertJoin = true
					}
					this.apply = true
					this.readyapply = false
					this.getMessageInfo()
				})
			},
			//取消报名
			capply(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_quxiao',
						act:'quxiao',
						huodongid:this.id,
						openid:'o8_g24y5hUM58628G7txtU29MKzM'
					}
				}).then(res=>{
					console.log(res)
					this.apply = false
					this.readyapply = true
					this.getMessageInfo()
				})
			},
			//收藏
			getCollection(){
				this.$axios({
					method:'post',
					data:{
						do:'shoucang',
						act:'huodong',
						id:this.Id,
						weid:103,
						blei:2,
						openid:'o9K-84mN0qlnbl9zsiwIYg94aw9g'
					}
				}).then(res=>{
					// console.log(res)
					this.getMessageInfo()
				})
			},
			//评论点赞
			getZanInfo(comment){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_running',
						act:'zan',
						openid:'o9K-84qRWHf4MSPhXXRPgyi8ngdo',
						weid:103,
						pinglunid:comment.id
					}
				}).then(res=>{
					console.log(res)
					this.getCommentInfo()
				})
			},
			getData(){
				this.Id = this.$route.query.Id
			}
		},
		mounted:function(){
			var _this=this
			this.bus.$on('send',(data)=>{
				console.log(data)
				_this.alertJoin = data
			})
			this.getData()
			this.getCommentInfo()
			this.getMessageInfo()
			this.getCollection()
			this.getZanInfo()
		},
		
	}
</script>
<style lang="stylus" type="text/stylus">
	.box
		background #fff
		.s_header
			padding 0.48rem 0.35rem 0.2rem
			font-size 0.32rem
			position relative
			text-align center
			height 0.6rem
			.iconfont
				float left
			.iconfonts
				float right
		.totlePage
			background #fff
			.pagedetail
				border-bottom-style inset
				border-bottom-width 0.2rem
				padding-bottom 0.2rem
				.pagePic
					height 4.5rem
					width 100%
				.message
					font-size 0.4rem
					margin-left 0.25rem
					margin-top 0.25rem
				.price
					color rgb(255, 0, 0)
					font-size 0.32rem
					margin-left 0.25rem
				.viewpage
					font-size 0.23rem
					margin-left 0.25rem
					display inline-block
				.viewtime
					display inline-block
					font-size 0.23rem
					float right
					margin-right 0.25rem
			.detaildata
				padding-top 0.35rem
				padding-left 0.2rem
				padding-bottom 0.35rem
				border-bottom-style inset
				border-bottom-width 0.2rem
				.font
					font-size 0.2rem
					font-weight lighter
				.iconfont
					float right
					padding-right 0.2rem
			.applyNum
				border-bottom-style inset
				border-bottom-width 0.2rem
				padding-top 0.1rem
				padding-bottom 0.1rem
				padding-left 0.15rem
				height 0.4rem
				.imgApply
					height 0.4rem
					width 1.5em
					border-radius 50%
					margin-left 0.1rem
				.serverNum
					float right
					font-size 0.2rem
					font-weight lighter
					padding-top 0.06rem
				.iconfont
					float right
					font-weight lighter
					padding-right 0.2rem
			.activDetil
				padding-top 0.35rem
				padding-left 0.25rem
				padding-right 0.25rem
				padding-bottom 0.25rem
				border-bottom-style inset
				border-bottom-width 0.2rem
				.actitle
					font-size 0.3rem
					font-weight bold
				.content
					font-size 0.25rem
					font-weight lighter
					height 2.1rem
					overflow hidden
					line-height 0.5rem
				.moreDetil
					padding-top 0.25rem
					text-align center
					font-weight lighter
			.viewComment
				padding-left 0.25rem
				padding-top 0.25rem
				border-bottom-width 0.005rem
				border-bottom-style inset
				.comment
					border-left 0.05rem solid #f00
					padding-left 0.2rem
					font-size 0.3rem
					margin-left 0.1rem
				.commentInfo
					padding-top 0.2rem
					.v_page
						display inline-block
						padding-top 0.15rem
						.avatar
							height 0.62rem
							width 0.62rem
							border-radius 0.3rem
					.v_info
						display inline-block
						position absolute
						padding-left 0.1rem
						.v_infoname
							font-size 0.3rem
							font-weight lighter
						.v_infotime
							font-size 0.2rem
							font-weight lighter
					.v_prcomment
						display inline-block
						float right
						padding-right 0.25rem
						.v_praise
							display inline-block
						// .v_comment
						// 	display inline-block
				.remark
					padding .1rem .25rem .2rem .7rem
			.bots
				height 1.5rem
				text-align center
		.footer
			height 1rem
			width 100%
			position fixed
			bottom 0
			border-top-style outset
			border-top-width 0.005rem
			background #fff
			.footer_cont
				display inline-block
				padding-left 0.4rem
				text-align center
			.footer_comment
				display inline-block
				padding-left 0.8rem
				text-align center
			.apply
				display inline-block
				width 3.8rem
				float right
				height 0.8rem
				margin-top 0.1rem
				margin-right 0.25rem
				text-align center
				line-height 0.8rem
				background #38f
				border-radius 0.1rem
				color #fff
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
						
						
</style>