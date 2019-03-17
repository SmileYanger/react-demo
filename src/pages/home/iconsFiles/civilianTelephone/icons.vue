<template>
	<div class="icons">
		<div class="icon" v-for="(item,id) of iconsList" :key="item.id" @click='fenlei(item.id)'>
			<div class="icon-img">
				<img class="icon-img-content" :src="item.thumb | url" />
				<p class="icon-keyword">{{item.name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'PhoneIcons',
  props:{
  	iconsList:Array
  },
  data () {
    return {
    }
  },
  methods:{
  	 fenlei(id){
  	 	this.$router.push({path:'/searchlist',query:{id:id}})
  	 }
  }
}
</script>

<style lang="stylus" scoped>
	@import "~styles/varibles.styl"
	@import "~styles/mixins.styl"
	.mint-swipe
		padding 0.1rem 0.1rem 0.4rem
		box-sizing border-box
		height 3.69rem
	.icons
		overflow: hidden
		background-color #fff
		padding-bottom .25rem 
		box-sizing border-box
		margin-bottom 0.2rem
		.swipe-item
			height 100%
		.icon
			overflow hidden
			width 20%
			height 1.32rem
			float left
			position relative
			margin-top: 0.25rem
			.icon-img
				position absolute
				top 0
				left 0
				right 0
				bottom 0
				box-sizing border-box
				.icon-img-content
					width 0.86rem
					height 0.86rem
					display block
					margin 0 auto
				.icon-keyword
					position absolute
					left 0
					right 0
					bottom 0
					height .44rem
					line-height .44rem
					color $darkTextColor
					text-align center
					font-size 0.24rem
					ellipsis()
</style>