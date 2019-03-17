<template>
	<div>
	     <div  v-for="(item,index) in listData" :key="item.id"  @click="goDetails(item.id)">
				<div class="item1" v-if="item.descimgs.length==1">
					<div class="item-left">
						<img :src="item.descimgs[0]">
					</div>
					<div class="item-right">
						<div class="title">{{item.title}}</div>
						<div class="title-detial">
							<div class="title-size">
								<img src="../../assets/images/home/top.png">
								<span>{{item.time}}</span>
								<span>{{item.yuedu}}阅读</span>
							</div>
							<div class="iconfont" >&#xeee0;</div>
						</div>
					</div>					
				</div>
				<div class="item2" v-if="item.descimgs.length==3">
					<div class="item2-title">{{item.title}}</div>
					<div class="item2-img" >			
						<img v-for="(m,index) in item.descimgs" :key='index' :src="m">
					</div>
					<div class="item2-detial">
						<div class="title-size">
							<img src="../../assets/images/home/top.png">
							<span>{{item.time}}</span>
							<span>{{item.yuedu}}阅读</span>
						</div>
						<div class="iconfont">&#xeee0;</div>
					</div>					
				</div>
				<div class="item3" v-if="item.descimgs.length==0">
					<div class="item3-title">{{item.title}}</div>
					<div class="item3-detial">
						<div class="title-size">
							<img src="../../assets/images/home/top.png">
							<span>{{item.time}}</span>
							<span>{{item.yuedu}}阅读</span>
						</div>
						<div class="iconfont">&#xeee0;</div>
					</div>
				</div>
	  	</div>
		<div class="nodata" v-if="deepe">  <!-- 无数据提示 -->
			<div class="nodata-content">
				<img src="../../assets/images/sousuo.png" >
				<p>暂无数据</p>
			</div>
		</div>  
	</div>
</template>

<script>
export default {

  name: 'List',
  props:{
  	listData:Array
  },
  created () {
	  console.log(123);
	 console.log(this.listData);
  },
  data () {
    return { 
		deepe:false
    }
  },
  watch: {
	  listData(val){
		  if(val.length === 0){
			  this.deepe = true
		  }
	  }
  },
  methods:{
  	goDetails(id){
  		console.log(id)
  		this.$router.push({path:'/hotdetails',query:{listId: id}})
  	}
  },
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
	.item1,.item2,.item3
		display flex
		width 100%
		padding 0.35rem 0.25rem
		box-sizing border-box
		background-color: #FFF
		border-bottom 0.001rem solid #eee
	.title-detial,.item2-detial,.item3-detial
		display flex
		justify-content space-between
		align-items center
		margin-top 0.4rem
		.title-size
			color rgb(178,178,178)
			font-size 0.2rem
			img
				width 0.49rem
				height 0.26rem
			span
				margin 0 0.05rem
	.item1
		justify-content space-between
		position relative
		.item-left
			width 2.28rem
			height 1.50rem
			margin-right 0.3rem
			img
				width 2.28rem
				height 1.50rem
				display  inline-block
		.item-right
			display flex
			flex-direction column
			justify-content center
			overflow hidden
			flex 1
			.title
				ellipsis()
				color rgb(51,51,51)
				font-size 0.3rem
	.item2,.item3
		flex-direction column
		position relative
		.item2-title
			ellipsis()
			margin-bottom 0.16rem
		.item2-img
			display flex
			justify-content space-between
			// height 1.5rem
			img
				width 2.25rem
				height 1.50rem	
		.item2-detial
			margin-top 0.15rem
	.item3
		.item3-title
			display -webkit-box    
			-webkit-box-orient vertical    
			-webkit-line-clamp 2  
			overflow hidden
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
</style>