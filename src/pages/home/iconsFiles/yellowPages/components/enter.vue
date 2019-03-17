<template>
<div class="box">
	<header-bar :title="title"></header-bar>
	<div style="padding-top: 1.28rem">
		<mt-field label="所处行业"   placeholder='请选择你要入驻的行业'
			@click.native="showModel(hy, 'hangye')"  
			v-model="hangye" 
			:key="hangye" 
			class="border-bottom">
		    <i class="iconfont arrow ">&#xe666;</i>
		</mt-field> 
    <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>

		<mt-field label="商家名称" placeholder="请输入商家名称" v-model="merchantName" class="border-bottom"></mt-field>
		<mt-field label="联系电话" placeholder="请输入联系电话" v-model="contactNumber" class="border-bottom"></mt-field>
		<group class="border-bottom">
		    <datetime v-model="endTime" format="YYYY-MM-DD"   :title="('营业时间')" ></datetime>
		</group>
		<mt-field label="公司地址" placeholder="请输入公司地址" v-model="companyAddress" class="mt20">
		    <i class="line">|</i>
		    <!-- <i class="iconfont">&#xe609;</i> -->
        <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe609;</router-link >
		</mt-field> 
		<x-textarea :max="200" :placeholder="('请输入商家介绍')" class="mt20 textarea" v-model="businessIntroduction"></x-textarea>
		<div tag='span'  class="submit" @click="nextStep">下一步</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
import Picker from 'common/picker.vue'
import HeaderBar from 'common/headerbar.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'HotEnter',
  components:{
    HeaderBar,
    Picker
  },
  data () {
    return {	
        rentAll:false,
        rentPart:false,
        boy:false,
        girl:false,
        demo1:false,
	      title:"我要入驻",
	      hangye:"",
	      modelState: false,	      
	      slots:[],
	      flag: '',
	      endTime:'请选择营业时间', // 营业时间
	       hy: [
	          {
	            flex: 1,
	            values: [],
	            className: 'slot1',
	            textAlign: 'center'
	          }
        ],
        merchantName:'', //商家名称
        contactNumber:'', //联系电话
        companyAddress:'',//公司地址
        businessIntroduction:'',//商家介绍
        newDate:''
    	}
  },
  created () {
     // 获取入住的行业
     this.getOccupancyIndustry()
      console.log(112233)
      this.bus.$on('',(res1,res2,res3)=>{
          this.companyAddress = res3
      })
  },
  methods: {
    showModel(txt, flag){
      this.modelState=true
      console.log(txt,1)
      this.slots=txt
      this.flag = flag
    },
    cancel () {
      this.modelState=false
    },
    confirm () {
      this.modelState=false
    },
    // 获取入住的行业
    async getOccupancyIndustry(){
      const {data:res} = await this.$axios({
        method: 'post',
        data:{
          do:'merchant',
          act:'nav',
          weid: this.$store.state.weid
        }
      })
      let newValues = []

      this.hy.forEach(ele => {
         
          newValues = ele.values
      });
      res.datas.forEach(element => {
        
        newValues.push(element.title)
      });
    },
    // 跳转到下一步
    nextStep(){
      // 验证入住的行业
      if(this.hangye === ''){
        return  Toast({
            message: '请选择要入住的行业',
            position: 'bottom',
            duration: 2000
          }); 
      }
      // 验证商家名称
      if(this.merchantName === ''){
        return  Toast({
            message: '请输入商家名称',
            position: 'bottom',
            duration: 2000
          }); 
      }    
      //手机号验证
      if(this.contactNumber === ''){
          return  Toast({
            message: '请输入联系电话',
            position: 'bottom',
            duration: 2000
          }); 
      }else {
          // var reg =/^1[3456789]\d{9}$/;
          var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/

          if(!reg.test(this.contactNumber)){
                return  Toast({
                  message: '请输入有效的手机号码',
                  position: 'bottom',
                  duration: 2000
                }); 
            }    
      }
      //请选择营业时间
      if(this.endTime === '请选择营业时间') {
          return  Toast({
            message: '请选择营业时间',
            position: 'bottom',
            duration: 2000
          }); 
      }   
      //公司地址验证
      if(this.companyAddress === ''){
        return  Toast({
            message: '请输入公司地址',
            position: 'bottom',
            duration: 2000
          }); 
      }
      // 商家介绍

      if(this.businessIntroduction === ''){
        return  Toast({
            message: '请输入商家介绍',
            position: 'bottom',
            duration: 2000
          }); 
      }
      this.newDate = { 
          hangye:this.hangye, //入住的行业
          merchantName:this.merchantName, //商家名称
          contactNumber:this.contactNumber, //联系电话
          endTime:this.endTime, //营业时间
          companyAddress:this.companyAddress, //公司地址
          businessIntroduction: this.businessIntroduction //商家介绍
        }
      // sessionStorage.setItem('busList', JSON.stringify(this.newDate))
      this.$router.push({ path: 'businesspicture', query: this.newDate})
    },

    // 返回黄页
    retClick(){
      // sessionStorage.removeItem('busList')
      console.log(123);
    }

 },
 mounted:function(){
      var _this=this
      this.bus.$on('change',function(value){
        if (_this.flag === 'hangye') {
          _this.hangye=value
        }
        
      })
 }

}
</script>

<style lang="stylus" scoped>
.box
  background #f6f6f6
.box >>> .mint-cell-title
    width 70px
.box >>> .mint-field
    border-right 0.25rem solid white
    border-left 0.25rem solid white
.box >>> .mint-cell-wrapper
    line-height 1rem
    background-image none
    box-sizing border-box
    padding 0
.box >>> .mint-cell-text
    font-size .3rem
    color #333
.box >>> .mint-field-core
  font-size .28rem
  color #ccc
  text-align right
  &::-webkit-input-placeholder 
    color #ccc
    font-size .28rem
  &:-moz-placeholder 
    color #ccc
    font-size .28rem
  &::-moz-placeholder 
     color #ccc
     font-size .28rem
  &:-ms-input-placeholder  
     color #ccc
     font-size .28rem
.mt20
  margin-bottom 0.2rem
.line
   padding 0 0.2rem 0.1rem
   font-size .3rem
   font-weight 300
   color #ccc
.iconfont
  color #3d8afe
.arrow
  font-size .4rem
  padding-left .1rem
  color #999
  margin-right -0.1rem
/*textarea*/
.box >>> .weui-cells:before,
.box >>> .weui-cell:before
	border-top none
.box >>> .weui-cells:after,
.box >>> .weui-cell:after
	border-bottom none
.box >>> .vux-cell-value
	font-size 0.28rem
	color #ccc
	font-weight nomal
.box >>> .weui-cell
    background white
    font-size 0.3rem
    color #333
    line-height 1rem
    padding 0
    border-bottom 1px solid #eae7e7
    width calc(100% - 0.5rem)
    margin-left 0.25rem 
.box >>> .weui-textarea
    height 2.23rem
    color #ccc
    font-size 0.28rem
    &::-webkit-input-placeholder 
      color #ccc
      font-size .28rem
    &:-moz-placeholder 
      color #ccc
      font-size .28rem
    &::-moz-placeholder  
       color #ccc
       font-size .28rem
    &:-ms-input-placeholder 
       color #ccc
       font-size .28rem

.textarea 
  margin 0!important
  padding 0 .25rem!important
.textarea >>> .weui-cell
  border-bottom none!important
.box >>> .vux-no-group-title
	margin-top 0	
/*发布*/
.submit
    width 7rem
    line-height 0.8rem
    background #3d8afe
    text-align center
    display  block
    font-size .3rem 
    color #fff
    border-radius .06rem
    margin 0.6rem auto 
    letter-spacing 1px

</style>
