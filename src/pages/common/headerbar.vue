<template>
 <div class="title border-bottom">
    <i class="iconfont" @click="Goback" >&#xe671;</i>
    {{title}}
  </div>
</template>

<script>
export default {

  name: 'headerbar',
  props:{
  	title:{
  		type:String
  	}
  },
  data () {
    return {
    }
  },
  methods:{
  	 Goback(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
    
    padding .6rem .35rem .2rem
    background rgb(247, 246, 246)
    font-size .32rem
    color #000
    position fixed
    text-align center
    letter-spacing 1px
    font-weight bold
    z-index 9999
    left 0
    right 0
    .iconfont
      width value
      position absolute
      left .35rem
      color #666
</style>