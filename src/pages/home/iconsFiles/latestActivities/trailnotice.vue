<template>
	<div class="tr_top">
		<Header-Bar :title='title'></Header-Bar>
		<div class="tr_title border-bottom">
			<span>全部</span>
			<span>旅游</span>
		</div>
		<div class="tr_box" v-for="tdata in trailData" v-show='dataPage'>
			<div class="tr_message">
				<p class="tr_mo">{{tdata.name}}</p>
				<div class="tr_postion">
					<i class="iconfent">&#xe609;</i>
					<p class="tr_mt">{{tdata.address}}</p>
				</div>
				<div class="tr_time">
					<i>{{tdata.time}}</i>   
					<p class="tr_mf">￥{{tdata.feiyong}}</p>
				</div>
			</div>
			<div class="tr_pictu">
				<img :src="tdata.thumb|url" class="tr_pic">
			</div>
		</div>
		<div v-show='nodata' class="notpage">
			<img src="@/assets/images/huodong.png">
			<p>暂无数据......</p>
		</div>
	</div>
</template>
<script>
	import HeaderBar from 'common/headerbar'
	export default {
		components:{
			HeaderBar
		},
		data() {
			return {
				title:'活动预告',
				trailData:[],
				dataPage:true,
				nodata:false
			}
		},
		methods:{
			//活动预告接口
			getTrailInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'huodong_fenlei',
						act:'yg_list',
						weid:118,
						blei:13
					}
				}).then(res=>{
					console.log(res)
					this.trailData = res.data.datas
					if(res.data.datas.length==0){
						this.dataPage = false
						this.nodata = true
					}else{
						this.dataPage = true
						this.nodata = false
					}
				})
			}
		},
		mounted:function(){
			this.getTrailInfo()
		}
	}
</script>
<style lang="stylus" scoped>
	.tr_top
		background #fff
		.tr_title
			padding 0.25rem
			font-size 0.3rem
			padding-top 1.4rem
		.tr_box
			padding 0.25rem
			border-bottom-style inset
			border-bottom-width 0.2rem
			display flex
			.tr_message
				background #fff
				.tr_mo
					padding-bottom 0.4rem
					font-size 0.25rem
					font-weight bold
				.tr_postion
					display flex
				.tr_time
					display flex
					.tr_mf
						margin-left 1.5rem
			.tr_pictu
				position fixed
				right 0.25rem
				.tr_pic
					height 1.5rem
					width 2rem
		.notpage
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