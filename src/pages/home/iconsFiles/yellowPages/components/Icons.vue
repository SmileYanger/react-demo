<template>
	<div class="icons">
		<mt-swipe :auto="0" :show-indicators="false">
		    <mt-swipe-item class="swipe-item" v-for="(page,index) of pages" :key="index" >
				<div class="icon" v-for="item of page" :key="item.id"  @click="handelClick(item.id,item.title)">
					<div class="icon-img">
						<img class="icon-img-content" :src='item.thumb | url'/>
						<p class="icon-keyword">{{item.title}}</p>
					</div>
				</div>
			</mt-swipe-item>   
		</mt-swipe>
	</div>
</template>

<script>
export default {
  name: 'Icons',
  props:{
    refs: Array,
    iconList: Array
  },
  computed: {

  	pages () {
  		const pages = []
  		this.iconList.forEach((item,index) => {
  			const page = Math.floor(index / 8)
  			if (!pages[page]) {
  				pages[page] = []
  			}
  			pages[page].push(item)
  		})
  		return pages
  	}
  },
  methods:{
  	handelClick(id,name){
	  this.$router.push({ name: 'IconList', query: { id: id, name:name }})
  	}
  }
}
</script>

<style lang="stylus" scoped>
	@import "~styles/varibles.styl"
	@import "~styles/mixins.styl"
	.mint-swipe
		box-sizing border-box
		height 3.69rem
	.icons
		overflow: hidden
		background-color #fff
		.swipe-item
			height 100%
		.icon
			overflow hidden
			width 25%
			height 1.37rem
			float left
			position relative
			margin-top: 0.3rem
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