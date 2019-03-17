<template>
  <div class="box">
    <div class="float">
      <div class="model">
        <div class="top-btn">
            <span @click="cancel">取消</span>
            <span @click="sure" >确定</span>
        </div>
        <mt-picker :slots="slots"  class="house-type"  show-toolbar ref="picker" ></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
export default {

  name: 'floor',
  props:{
    slots:Array,
    modelState:Boolean
  },
  data () {
    return {
       showModel: true,
       houseType:''
      }
   },
   mounted:function(){
      this.showModel=this.modelState
    },
   methods:{
      cancel(){
        this.$emit('cancel')
      },
      sure(e){
        this.$emit('confirm')
         var values = this.$refs.picker.getValues()
             var replaceStr = ',';
             var str = values.toString();
             this.houseType=str.replace(new RegExp(replaceStr,'gm'),'-')

         
              console.log( this.houseType)
          this.bus.$emit('change',this.houseType)
      }
   }

 }
</script>

<style lang="stylus" scoped>
  .box >>> .picker-slot
    font-size 0.3rem
    letter-spacing 1px
  .box >>> .picker-toolbar
    display none
  .box >>> .picker-selected
    color #058cff
  .float
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0, 0, 0, .5)
    z-index 99
    .model
      background white
      position absolute
      bottom 0
      width 100%
      overflow hidden

      .top-btn
          display flex
          justify-content space-between
          font-size .28rem
          padding 0 0.25rem
          box-sizing border-box
          line-height .8rem
          color #333
          letter-spacing 1px
          background #f7f6f6
          margin-bottom -36px
          position relative
          z-index 9999
      .top-btn span:nth-child(2)
          color #058cff
</style>
