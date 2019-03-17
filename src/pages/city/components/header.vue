<template>
	<div class="header">
		<div class="header-left">
			<router-link to="/" tag="div">
				<i class="iconfont back-icon">&#xe624;</i>
			</router-link>
		</div>
		选择城市
	</div>
</template>

<script>
	export default{
		name:'CityHeader'
	}
</script>

<style lang="stylus" scoped="scoped">
	 @import '~styles/varibles.styl'
	.header
		line-height:0.86rem
		display:flex
		background:$bgColor
		color:#fff	
		text-align:center
		display:block
		letter-spacing:2px	
	.header-left
		width:0.64rem
		float:left
	.back-icon
		text-align:center
		font-size:0.4rem
</style>