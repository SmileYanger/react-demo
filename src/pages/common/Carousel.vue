<template>
  <div>
    <mt-swipe :auto="5000">
      <mt-swipe-item class="swipe-item" v-for="(item,index) in bannerImg" :key="index">
				<img :src="item.thumb | url" alt="" >
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {

  name: 'Carousel',
  props:{
    bannerImg: Array
  },

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
        width: 100%    
</style>
