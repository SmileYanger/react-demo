<template>
	<div class="top">
		<div class="m_header">
			<div class="min_header">
				<i class="iconfont" @click="goback">&#xe671;</i>
				<span class="title">{{len}}人已报名</span>
			</div>
			<div class="personInfo"  v-for="item in detailData">
				<img :src="item.img" class="userPic">
				<p class="b_name border-bottom">
					{{item.name}}
					<i>{{item.time}}</i>
				 </p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"memberlist",
		methods:{
			goback(){
				this.$router.push({path:'/activesearch',query:{Id:this.Id}})
			},
			getMemberInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_member',
						act:'member',
						id:this.Id,
						weid:103
					}
				}).then(res=>{
					this.detailData = res.data.datas
					this.len = this.detailData.length 
				})
			},
			getData(){
				this.Id = this.$route.query.Id
			}
		},
		mounted:function(){
			this.getData()
			this.getMemberInfo()
		},
		data(){
			return{
				Id:'',
				len:'',
				detailData:[],
			}
		}
	}	
</script>
<style lang="stylus" type="text/stylus">
	.m_header
		background #fff
		.min_header
			padding 0.48rem 0.35rem 0.2rem
			font-size 0.32rem
			position relative
			text-align center
			height 0.6rem
			border-bottom-style inset
			border-bottom-width 0.005rem
			background #f6f6f6
			.iconfont
				float left
			.title
				background #fff
		.personInfo
			padding .15rem .2rem .15rem .25rem
			height 0.9rem
			display flex 
			.userPic
				height 0.66rem
				width 0.66rem
				border-radius 50%
				margin-right .2rem
			.b_name
				padding-top 0.15rem
				padding-left 0.2rem
				flex 1
				font-size 0.28rem
				color rgb(102, 102, 102)
				i
					float right
					font-size 0.24rem
					color rgb(178, 178, 178)
</style>
