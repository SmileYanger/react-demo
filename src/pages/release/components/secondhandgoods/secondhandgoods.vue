<template>
<div class="box">
  <header-bar :title="title"></header-bar>
  <div class="top65">
      <mt-field label="标题" placeholder="请输入标题" class="mt20" v-model="biaoti"></mt-field>
      <!--职位-->
      <mt-field label="新旧"  class="border-bottom" @click.native="showModel(xj, 'xinjiu')"  v-model="xinjiu"  :key="xinjiu" readonly>
        <i class="iconfont arrow ">&#xe666;</i>
   </mt-field> 
      <!-- picker -->
      <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>

      <div class="price mt20">
        <span>售价</span>
        <input type="text" placeholder="请输入金额" v-model="jiage">
        <i class="yuan">万元</i>
        <check-icon :value.sync="demo1"> {{ ('面议') }}</check-icon>
     </div>
    
     <x-textarea :max="200" :placeholder="('详细信息')" class="mt20" v-model="body"></x-textarea>

    <mt-field label="联系人" placeholder="请输入联系人" class="border-bottom" v-model="name"></mt-field>
    <mt-field label="联系方式" placeholder="联系方式" class="border-bottom" v-model="mobile"></mt-field>  
    <!--上传组件-->
    <div class="house-pic">
        <p class="pic-title">请上传照片 <i>（最多上传12张）</i></p>
        <up-loader  @fuImg="fuu" :src="'/api/imgs'"></up-loader>
        <span class="submit" @click="submit">发布</span>
    </div>   
  </div>
  <!-- alert组件 -->
  <alert v-show="alertState" :alertTip="alertTip"></alert>
</div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()

import Picker from 'common/picker.vue'
import HeaderBar from 'common/headerbar.vue'
import UpLoader from 'common/uploader.vue'
import alert from 'common/alert.vue'
export default {

  name: 'SecondHandgoods',
  components:{
    HeaderBar,
    Picker,
    UpLoader,
    alert
  },
  data () {
    return { 
         alertState:false,
        alertTip:'提示', 
        biaoti:'',
        jiage:"",
        body:"",
        name:'',
        mobile:'',
        demo1:false,
        title:"二手物品",
        modelState: false,
        xinjiu:"请选择使用程度",       
        slots:[],
        flag: '',
         xj: [
            {
              flex: 1,
              values: ['全新','9成新','8成新','7成新','6成新','5成新以下'],
              className: 'slot1',
              textAlign: 'center'
            }
        ],
        filelist:[]
      }
      
  },
  methods: {
    fuu(val){
      this.filelist.push(val)
      },
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
    sure(){
      this.alertState=false
    },
    submit(){
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
       // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if(this.demo1=true){
        this.jiage='面议'
      }
      if (this.biaoti == '') {
         this.alertState=true
         this.alertTip = '请输入标题';
      } else if (this.xinjiu  == '请选择使用程度') {
         this.alertState=true
         this.alertTip = '请选择使用程度';
      } 
      else if (this.jiage  == '') {
         this.alertState=true
         this.alertTip = '请输入价格';
      } 
      else if (this.body  == '') {
         this.alertState=true
         this.alertTip = '请输入详细信息';
      }
      else if (this.name == '') {
         this.alertState=true
         this.alertTip = '请输入联系人';
      }
      else if (this.mobile == '') {
         this.alertState=true
         this.alertTip = '请输入联系方式';
      }
       else  if (!myreg.test(this.mobile)) {
         this.alertState=true
         this.alertTip = '请输入正确的联系方式';
      }
      
       else if (this.filelist.length == 0) {
         this.alertState=true
         this.alertTip = '请上传照片';
      } 
      else {
        this.alertState=false 
        this.$axios({  //二手交易
          method: 'post',
          data:{
          do:'fabu',
          type:5,
          weid:this.$store.state.weid,
          title:this.biaoti,
          name:this.name,
          phone:this.mobile,
          openid:this.$store.state.openid,
          xinjiu:this.xinjiu,
          jiage:this.jiage,
          body:this.body,
          filelist:this.filelist.join(",")
          },
          }).then(res=>{
            console.log(res)
            if(res.data.code==200){
              this.$router.push('/')
              this.$destroy(true)
          }
          if(res.data.code==402 || res.data.code==401){

            this.$router.push('/login')
            this.$destroy(true)
          }
        })
      }
   }
 },
 mounted:function(){
      var _this=this
      this.bus.$on('change',function(value){
        if (_this.flag === 'xinjiu') {
          _this.xinjiu=value
        }
      })
       this.bus.$on('send',function(val){
        console.log(val)
        _this.alertState=val
      })
 }

}
</script>

<style lang="stylus" scoped>
.top65
  padding-top 1.28rem
.line
    padding 0 0.1rem 0 0.2rem
    font-size .3rem
    font-weight 300
    color #ccc
.iconfont
    color #3d8afe
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
.cell-box >>> .mint-cell-wrapper  
   width calc(100% - 0.5rem)
   border-bottom 1px solid #f6f6f6
   box-sizing border-box
   margin-left 0.25rem
    
.mt20
  margin-bottom 0.2rem
.arrow
  font-size .4rem
  padding-left .1rem
  color #999
  margin-right -0.1rem
  
.budge
  font-size .28rem
  color #666
  margin-left 0.05rem

.price
  line-height 1rem
  width 100%
  padding 0 0.25rem
  box-sizing border-box
  font-size 0.3rem
  background white
  color #333
  display flex
  input
    text-align right
    padding-right 0.05rem
    width 50px
    flex 1
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
  span
    width 100px
    display inline-block
  .yuan
    margin-right 0.5rem
    font-size .28rem
    
/*textarea*/
.box >>> .weui-cell
    background white
    font-size 0.3rem
    color #333
    line-height 0.68rem
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
.box >>> .weui-cell:before
    border none
    
  /*radio*/
.box >>> .weui-icon-circle,
.box >>> .weui-icon-success
    font-size 0.32rem!important


.house-pic
    height auto
    padding 0.3rem 0.25rem 
    box-sizing border-box
    width 100%
    background white
    zoom 1
    overflow hidden
    .pic-title
        font-size 0.3rem
        color #333
        i 
            color #ccc
            font-size 0.26rem
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
