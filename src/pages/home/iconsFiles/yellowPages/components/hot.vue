<template>
    <div class="shop">
		<div class="top">
			<div class="title">热门商家</div>
			<router-link class="more" tag="div"  :to="{path:'/hotbusiness',query:{allHotBus:allHotBusinessList}}">更多<span class="iconfont">&#xe666;</span></router-link>
		</div>
		<div class="bottom">
			<div class="item" v-for='(itme) in allHotBusinessList.slice(0,3)' :key="itme.id" @click="isSeller(itme.id)">
				<img :src="itme.thumb | url">
				<div class="name">{{itme.name}}</div>
				<div class="address">
					<span class="iconfont">&#xe611;</span>
					<span class="detial">{{itme.address}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'hot',
  created () {
		this.getHotBusiness()  
  },
  data () {
    return {
		//全部热门商家列表
		allHotBusinessList:''
    }
  },
  methods: {
	  //获取热门商家数据
	  async getHotBusiness(){
		  const {data:res} = await this.$axios({
			  method:'post',
			  data:{
				  do:'merchant',
				  type:'hot',
				  weid:this.$store.state.weid,
				  page:1,
				  psize:10
			  }
		  })
		// console.log(res);
		if(res.code !== '200') return console.log("请求数据失败");
		this.allHotBusinessList = res.datas
		
		 },
		 //获取id跳转详情页
		isSeller(id){
			this.$router.push({ path: '/yellowdetails', query: { id: id }})
		}
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
.shop
	display flex
	flex-direction column
	background-color #FFF
	padding 0.3rem 0.25rem
	margin-top .2rem
	.top
		display flex
		justify-content space-between
		margin-bottom 0.3rem
		align-items center
		.title
			font-size 0.3rem
			font-weight bold
		.more
			font-size 0.28rem
			color #666
		.iconfont
			margin-left 0.14rem
	.bottom
		display flex
		justify-content space-between
		.item
			position relative
			img
				width 2.3rem
				height 2.2rem
			.name,.address
				position absolute
				left 0.12rem
			.name
				bottom 0.54rem
				font-size 0.26rem
				color #fdc245
			.address
				bottom 0.14rem
				font-size 0.22rem
				color #fff
				.iconfont
					font-size 0.26rem
				.detial
					ellipsis()
</style>