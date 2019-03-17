<template>
<div class="content">
	<div class="header">
		<router-link class="header-city" tag='div' to="/mycity">{{this.$store.state.city}}<span class="iconfont">&#xe684;</span></router-link>
		<div class="header-input">
			<span class="iconfont">&#xe6c6;</span>
			<input class="search" type="text" placeholder="请输入搜索信息" name="" @click='goSearch'>
		</div>
		<div class="iconfont header-msg">&#xe6aa;</div>
	</div>
</div>
	
</template>

<script>
export default {

  name: 'Search',

  data () {
    return {

    }
  },
  methods:{
  	goSearch(){
  		this.$router.push('./homesearch')
  	}
  }
}
</script>

<style lang="stylus" scoped>
.content
	display flex
	justify-content center
	.header
		width 100%
		display flex
		margin 0 auto
		padding 0 0.37rem
		box-sizing border-box
		color #fff
		align-items center
		.header-city
			min-width: 1.04rem
			float: left
			text-align:center
			.iconfont
				margin-left 0.1rem
				width 0.16rem
				height 0.16rem
		.header-input
			width 100%
			font-size 0.26rem
			color rgb(153,153,153)
			height 0.6rem
			line-height 0.6rem
			border-radius 0.3rem
			margin 0 0.18rem
			background #fff
			opacity 0.8
			.iconfont
				margin-left 0.3rem
			.search
				height 0.6rem
				vertical-align top	
		.header-msg
			width 0.4rem
			height 0.4rem
</style>