<template>
  <div class="box">
    <div class="float">
      <div class="model">
        <div class="top-btn">
          <span @click="cancel">取消</span>
          <span @click="sure" >确定</span>
        </div>
        <mt-picker :slots="addressSlots"  class="house-type"  show-toolbar ref="picker" @change="onAddressChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  Vue.prototype.bus=new Vue()

  import s from '../../../../static/address3.json'
  export default {

    name: 'floor',
    props:{
      modelAddressState:Boolean
    },
    data () {
      return {
        showModel: true,
        houseType:'',
        addressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(s),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        addressProvince: '省',
        addressCity: '市',
        addressXian: '区',
      }
    },
    mounted:function(){
      this.showModel=this.modelAddressState

      this.$nextTick(() => {
        setTimeout(() => {//这个是一个初始化默认值的一个技巧
          this.addressSlots[0].defaultIndex = 0;
        }, 100);
      });
    },
    methods:{

      onAddressChange(picker, values) {
        let sheng = Object.keys(s);
        let shi = Object.keys(s[values[0]]);

        let index = shi.indexOf(values[1])
        let xian = s[values[0]][shi[index]];
        this.xianObj = xian;
        picker.setSlotValues(1, shi);
        this.addressProvince = values[0];
        this.addressCity = values[1];
        this.addressXian = values[2];
        picker.setSlotValues(2, Object.keys(xian));
      },


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
    },
  }
</script>

<style lang="stylus" scoped type="text/stylus">
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
