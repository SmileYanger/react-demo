<template>
	<div class="alert" >
      <div class="alert-box" >
        <h2>提示</h2>
        <p class="border-bottom tip">{{alertTip}}</p>
        <p class="sure" @click="sure">确定</p>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
export default {

  name: 'alert',
	props:{
		alertTip:String
	},
  data () {
    return {
    }
  },
  methods:{
  	sure(){
  		this.bus.$emit('send',false)
  	}
  }
}
</script>

<style lang="stylus" scoped>
.alert
  position fixed
  top 0px
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, .25)
  z-index 99
  display: flex;
  align-items: center;
  justify-content: center;
  .alert-box
    width 70%
    heigth 4rem!important
    background-color white
    display block
    margin auto
    text-align center
    h2
      font-weight bold
      padding .2rem 0
      letter-spacing 1px
    .tip
        padding-bottom .1rem
        letter-spacing 1px
    .sure
      padding .2rem 0
      color #008aff
      letter-spacing 1px
</style>