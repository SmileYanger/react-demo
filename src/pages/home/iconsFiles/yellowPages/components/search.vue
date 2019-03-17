<template>
<div class="content">
	<div class="header">
		<div class="header-city" tag='div' @click='goBack'>
			<i class="iconfont">&#xe671;</i>
		</div>
		<div class="header-input" >
			<span class="iconfont">&#xe6c6;</span>
			<input class="search" type="text" placeholder="找商家" name="" @click="goSearch">
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
	goBack(){
		this.$router.go(-1)
	},
  	goSearch(){
  		this.$router.push('./yellowsearch')
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
		padding 0 0.25rem
		box-sizing border-box
		color #fff
		align-items center
		.header-city
			float: left
			text-align:center
			.iconfont
				
				width 0.16rem
				height 0.16rem
		.header-input
			width 100%
			font-size 0.26rem
			color rgb(153,153,153)
			height 0.6rem
			line-height 0.6rem
			border-radius 0.3rem
			border 1px solid #ccc
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