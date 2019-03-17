<template>
	<div class="r_top">
		<header-bar :title="title"></header-bar>
		<div class="m_commit">
			<div class="m_commit_tit border-bottom">
				<img :src="img|url" class="m_img">
				<div class="m_info">
					<h3>{{name}}</h3>
					<h4>{{time}}</h4>
				</div>
				<div class="redheart">
					<i class="iconfont">&#xe696;</i>
					<!-- <i>{{item.num}}</i> -->
				</div>
				<p class="message">{{body}}</p>
			</div>
			<div class="all_reply">
				<i class="a_reply">全部回复</i>
				<div class="a_reply_sing border-bottom">
					<img :src="img" class="s_img">
					<div class="s_info">
						<h3>{{name}}</h3>
						<h4>{{time}}</h4>
					</div>
					<div class="s_redheart">
						<i class="iconfont">&#xe696;</i>
						<!-- <i>{{item.num}}</i> -->
					</div>
					<!-- <p class="s_message">{{item.info}}</p>  -->
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
import HeaderBar from 'common/headerbar.vue'
	export default{
		components:{
			HeaderBar
		},
		data() {
			return {
				title:"评论详情页",
				openid:'',
				time:'',
				body:'',
				name:'',
				img:''
			}
		},
		methods:{
			//获取评论再评论信息接口
			getReplyInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'quan_running',
						openid:'o8_g24_2b-M7-olvQLf51AJUfsSo',
						id:621,
						body:'',
						weid:this.$store.state.weid,
						act:'running'
					}
				}).then(res=>{
					console.log(res)
				})
			},
			getData(){
				this.openid = this.$route.query.tId
				this.time = this.$route.query.time
				this.body = this.$route.query.tbody
				this.name = this.$route.query.tname
				this.img = this.$route.query.timg
			}
		},
		mounted:function(){
			this.getData()
		}
	}	
</script>
<style lang="stylus" type="text/stylus">
	.m_commit
		background #fff
		.m_commit_tit
			padding 0.25rem 0.25rem 0.25rem 0.25rem
			.m_img
				height 0.66rem
				width 0.66rem
				border-radius 50%
			.m_info
				display inline-block
				margin-left 0.2rem
				position absolute
				h3
					font-size 0.2rem
					color rgb(102, 102, 102)
				h4
					font-size 0.2rem
					color rgb(178, 178, 178)
			.redheart
				float right
			.message
				margin-top 0.25rem
		.all_reply
			padding 0.25rem 0.25rem 0.25rem 0.25rem
			.a_reply
				font-size 0.3rem
				font-weight initial
			.a_reply_sing
				padding 0.25rem 0.25rem 0.25rem 0.25rem
				.s_img
					height 0.66rem
					width 0.66rem
					border-radius 50%
				.s_info
					display inline-block
					margin-left 0.2rem
					position absolute
					h3
						font-size 0.2rem
						color rgb(102, 102, 102)
					h4
						font-size 0.2rem
						color rgb(178, 178, 178)
				.s_redheart
					float right
				.s_message
					margin-top 0.25rem
</style>

