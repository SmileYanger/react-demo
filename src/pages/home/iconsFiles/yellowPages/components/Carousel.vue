<template>
  <div>
    <mt-swipe :auto="5000">
      <mt-swipe-item class="swipe-item" v-for="(item,index) in lunBoImg" :key="index">
				<img :src="item.thumb|url" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {

  name: 'Carousel',
  props:['lunBoImg'],

  data() {
    return {
    }
  },
  
}

</script>
<style lang="stylus" scoped>
	.mint-swipe
		height: 4.12rem
		.swipe-item
			height: 100%
			img
				height: 100%
</style>
