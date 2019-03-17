<template>
	<div class="box"> 
		<div class="v_header">
			<i class="iconfont" @click="goback">&#xe671;</i>
			<span class="title">活动详情</span>
		</div>
		<div class="moreInfo" v-for="item in detailData">
			<p class="content">{{body}}</p>
			<img :src="item.detailPic" class="detailPic">
		</div>
	</div>
</template>
<script>
	export default{
		name:"viewinfo",
		data(){
			return{
				body:'',
			}
		},
		methods:{
			goback(){
				this.$router.push("/activesearch")
			},
			getData(){
				this.body = this.$router.query.body
			}
		},
		mounted:function(){
			this.getData()
		},
		
	}
</script>
<style lang="stylus" type="text/stylus">
	.v_header
		padding 0.48rem 0.35rem 0.2rem
		font-size 0.32rem
		position relative
		text-align center
		height 0.6rem
		border-bottom-style inset
		border-bottom-width 0.005rem
		.iconfont
			float left
		.totlePage
			background #fff
	.moreInfo
		padding-left 0.25rem
		padding-top 0.25rem
		font-size 0.3rem
		padding-right 0.25rem
		.detailPic
			height 4rem
			width 100%
</style>