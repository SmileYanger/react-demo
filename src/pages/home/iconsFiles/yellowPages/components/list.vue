<template>
	<div class="content" ref='conList'>
		<router-link tag="div"  class="item" :to="{path:'/yellowdetails',query:{id:item.id}}" v-for="(item) in dataList" :key="item.id"  >
	        <div class="item-left" >
	          	<img :src="item.thumb | url">
	        </div>
	        <div class="item-right" >
	          	<div class="top">
		            <div class="title" >
		                <div>{{item.name | ellpers}}</div>
		            	<span class="hot" v-if="tabIndex == 1">最新</span>
		            	<!-- <span class="hot" v-else-if="tabIndex === 1">最新</span> -->
		            </div>
		            <div class="read">{{item.yuedu}}浏览</div>
	         	 </div>
		        <div class="middle">
	            	<span class="time">{{item.yingye}}</span>
		            <div>|</div>
		            <span class="phone">{{item.tel}}</span>
		        </div>
	            <div class="bottom">
		            <span class="iconfont">&#xe611;</span>
		            <span class="address">{{item.address}}</span>
	            </div>
	        </div>
			
	    </router-link>
		<div class="nodata" v-if="deep">  <!-- 无数据提示 -->
			<div class="nodata-content">
				<img src="../../../../../assets/images/sousuo.png" >
				<p>暂无数据</p>
			</div>
		</div>  
		<div class="nodataer" v-if="deeper">  <!-- 无数据提示 -->
			<div class="nodataer-contenter">
				<img src="../../../../../assets/images/sousuo.png" >
				<p>暂无数据</p>
			</div>
		</div> 
	</div>
	
</template>

<script>
export default {
	name: 'list',
	data () {
	return {
		dataList:[], //获取到对应id的商铺
		tabIndex:'', //tab索引
		deep:false, 
		deeper: false,
	}	
	},
	props: ['fuList','fullIndex','bussList','oneFilst','allList','bussList2'],
	created () {

	console.log(this.allList);
	if(this.allList !== ''){
		this.dataList = this.allList	
	}else {
		this.deep =true
	}
	},
	methods: {
		
	},
	mounted() { 	

	},
	watch: {
		fuList(val){	
			if(val.length === 0){
				this.deeper = true
			}
			this.dataList = val
		},
		fullIndex(val){	
			
			this.tabIndex = val
		},
	//黄页关键字搜素
		bussList(val){
		//   if(this.dataList.length === 0){
		// 	  this.dataList = []
		//   }
			if(val.length === 0){
				this.deep = true
			}
			this.dataList = val
		},
		oneFilst(val){
			if(val.length === 0){
				this.$refs.conList.style.height = 500 + 'px'
				this.deeper = true
			}
			this.dataList = val
		},
		// 首页搜索数据
		bussList2(val){
				console.log(val);
				if (val.length === 0) {
					this.deep = true
				}
			this.dataList = this.bussList2
		},
		allList(val){
		
		}
	},
	
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
.content
	background-color: #FFF
	padding 0 0.25rem
	.item
		display flex
		padding 0.24rem 0
		border-bottom 1px solid #eee
		align-items center
		background-color white
		width 100%
		.item-left
			width 1.94rem
			height 1.50rem
			border 1px solid #ccc
			margin-right 0.3rem
			img
				width 1.94rem
				height 1.50rem
		.item-right
			flex 1
			.top
				display flex
				justify-content space-between
				align-items center
			.title
				font-size 0.32rem
				color #333
				flex 1
				display flex
				align-items center
				ellipsis()
				.hot
					color red
					font-size .12rem
					border 1px solid red
					padding 0 .05rem!important
					border-radius 10%
			div
				ellipsis()
			img
				width 0.5rem
				height 0.28rem
				margin-left 0.1rem
			.read
				font-size 0.2rem
				color #999
		.middle
			font-size 0.22rem
			color #999
			display flex
			align-items center
			margin 0.1rem 0
			div
				margin 0 0.1rem
		.bottom
			font-size 0.24rem
			color #999
			display flex
			ellipsis()
			.iconfont
				font-size 0.26rem
			.address
				width 4rem!important				
				flex 1
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
.nodata
	position fixed
	background-color white
	z-index 9999
	top 1.3rem
	right 0
	bottom 0
	left 0
	margin auto
	heigth 100%
	display flex
	justify-content space-between
	align-items center
	flex-direction column 
	.nodata-content
		position: absolute
		top:50%
		left: 50%
		transform: translate(-50%,-50%)
		text-align: center
		img 
		width: 3rem
	p
		padding-top .5rem
		color #666
		font-size .26rem
		letter-spacing 1px
.nodataer
	position fixed
	background-color white
	z-index 9999
	top 1.3rem
	right 0
	bottom 0
	left 0
	margin auto
	heigth 100%
	display flex
	justify-content space-between
	align-items center
	flex-direction column 
	.nodataer-contenter
		position: absolute
		top:50%
		left: 50%
		transform: translate(-50%,20%)
		text-align: center
		img 
		width: 3rem
	p
		padding-top .5rem
		color #666
		font-size .26rem
		letter-spacing 1px
</style>