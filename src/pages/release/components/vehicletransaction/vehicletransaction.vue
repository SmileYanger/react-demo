<template>
<div class="box">
  <header-bar :title="title"></header-bar>
  <div class="top65">
      <mt-field label="标题" placeholder="请输入标题" class="mt20" v-model='biaoti'></mt-field>

      <!--类型-->
      <mt-field label="类型"  class="border-bottom" @click.native="showModel(lx, 'type')"  v-model="type"  :key="type" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>   

       <!--颜色-->
      <mt-field label="颜色"  class="border-bottom" @click.native="showModel(color, 'carColor')"  v-model="carColor"  :key="carColor" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>  

      <!--变速-->
      <mt-field label="变速"  class="border-bottom" @click.native="showModel(speed, 'changeSpeed')"  v-model="changeSpeed"  :key="changeSpeed" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>   
      
       <mt-field label="排量" placeholder="请输入排量" class="mt20" v-model="pailiang">
        <span class="budge">L</span>
      </mt-field> 
       <mt-field label="表显历程" placeholder="请输入里程" class="border-bottom" v-model='gongli'>
        <span class="budge">万公里</span>
      </mt-field> 

      <!-- 性质   -->
      <mt-field label="性质"  class="border-bottom" @click.native="showModel(xz, 'xinzhi')"  v-model="xinzhi"  :key="xinzhi" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>
      
      <group class="border-bottom">
        <datetime v-model="cardTime"  :title="('上牌时间')"  ></datetime>
      </group>

      <group class="border-bottom">
        <datetime v-model="deadLine"  :title="('年检时间')"  ></datetime>
      </group>

      <group class="border-bottom">
        <datetime v-model="strongRisk"  :title="('强险到期')"  ></datetime>
      </group>

      <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>
      
    <!-- 售价 -->
    <div class="price border-bottom">
      <span>售价</span>
      <input type="text" placeholder="请输入金额" v-model="jiage">
      <i class="yuan">万元</i>
      <check-icon :value.sync="demo1"> {{ ('面议') }}</check-icon>
    </div>
    
    <!--出租方式-->
     <mt-cell title="又无抵押" class="mt20 way" v-model='diya'>
      <check-icon :value.sync="yes" @click="yeser"> {{ ('有') }}</check-icon>
      <check-icon :value.sync="no" @click="none"> {{ ('无') }}</check-icon>
    </mt-cell>

    <!--房屋详情-->
   <x-textarea :max="200" :placeholder="('车辆详情')" class="mt20 textarea" v-model='body'></x-textarea>
    
     <!-- 联系人 -->
    <mt-field label="联系人" placeholder="姓名" class="border-bottom" v-model="name"></mt-field> 

     <!-- 联系方式 -->
    <mt-field label="联系方式" placeholder="电话号码" class="border-bottom mt20" v-model='mobile'></mt-field>
  
    <!--上传组件-->
    <div class="house-pic">
        <p class="pic-title">房源照片 <i>（最多上传12张）</i></p>
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

  name: 'VehicleTransaction',
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
      diya:'',
      biaoti:'',
      pailiang:"",
      gongli:'',
      jiage:'',
      body:'',
      yes:true,
      no:false,
      demo1:false,
      name:'',
      mobile:'',      
      title:"车辆交易",
      modelState: false,
      type:'请选择车辆类型',
      carColor:'请选择车容量颜色',
      changeSpeed:'请选择变速箱',
      xinzhi:'请选择车辆性质',
      cardTime:'请选择上牌时间',
      deadLine:'请选择年检时间',
      strongRisk:'请选择到期时间',
      louceng:'请选择楼层',
      zhuangxiu:'请选择装修类型',
      chaoxiang:'请选择朝向',
      rent:'请选择交租方式',
      slots:[],
      filelist:[],
      flag: '',
      lx:[
          {
            flex: 1,
            values: ['小轿车','越野车','面包车','SUV','皮卡车','商务车','其他类型'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex:  1,
          }
      ],
      color:[
          {
            flex: 1,
            values: ['黑','白','红','灰','银','蓝','黄','棕','绿','橙','紫','香槟','金','粉红','其他'],
            className: 'slot1',
            textAlign: 'center'
          }
      ],
      speed:[
          {
            flex: 1,
            values: ['手动档','自动档','手自一体','CVT'],
            className: 'slot1',
            textAlign: 'center'
          }
      ],
      xz:[
          {
            flex: 1,
            values: ['营运车辆','非营运车辆','家庭自用车辆','特种车辆'],
            className: 'slot1',
            textAlign: 'center'
          }
       ]                 
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
    cancel() {
      this.modelState=false
    },
    confirm() {
      this.modelState=false
    },
    yeser(){
      this.yes=false
      this.none=true
      
    },
    none(){
      this.no=false
      this.yes=true
    },
    sure(){
      this.alertState=false
    },
    submit(){
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
       // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if(this.yes==true){
        this.diya='有抵押'
      }else{
        this.diya='无抵押'
      }  
      if(this.demo1==true){
        this.jiage='面议'
      }
      if (this.biaoti == '') {
         this.alertState=true
         this.alertTip = '请输入标题';
      } else if (this.type  == '请选择车辆类型') {
         this.alertState=true
         this.alertTip = '请选择车辆类型';
      } else if (this.carColor == '请选择车容量颜色') {
         this.alertState=true
         this.alertTip = '请选择车容量颜色';
      } else if (this.changeSpeed == '请选择变速箱') {
         this.alertState=true
         this.alertTip = '请选择变速箱';
      }
      else if (this.pailiang == '') {
         this.alertState=true
         this.alertTip = '请输入排量';
      }
      else if (this.gongli == '') {
         this.alertState=true
         this.alertTip = '请输入里程';
      }
      else if (this.xinzhi == '请选择车辆性质') {
         this.alertState=true
         this.alertTip = '请选择车辆性质';
      }
      else if (this.cardTime == '请选择上牌时间') {
         this.alertState=true
         this.alertTip = '请选择上牌时间';
      }
      else if (this.deadLine == '请选择年检时间') {
         this.alertState=true
         this.alertTip = '请选择年检时间';
      }
       else if (this.strongRisk == '请选择到期时间') {
         this.alertState=true
         this.alertTip = '请选择到期时间';
      }
       else if (this.jiage == '') {
         this.alertState=true
         this.alertTip = '请输入价格';
      }
       else if (this.body == '') {
         this.alertState=true
         this.alertTip = '请输入车辆详情';
      }
      else if (this.name == '') {
         this.alertState=true
         this.alertTip = '请输入联系人';
      }else if (this.mobile == '') {
         this.alertState=true
         this.alertTip = '请输入手机号';
      } 
       else  if (!myreg.test(this.mobile)) {
         this.alertState=true
         this.alertTip = '请输入正确的联系方式';
      }
      else if (this.filelist.length == 0) {
         this.alertState=true
         this.alertTip = '请上传房源照片';
      }  
      else{
        this.$axios({  //车辆交易
           method: 'post',
           data:{
           do:'fabu',
           type:7,
           weid:this.$store.state.weid,
           title:this.biaoti,
           leixing:this.type,
           color:this.carColor,
           biansu:this.changeSpeed,
           mileage:this.gongli,
           displacement:this.pailiang,
           card_time:this.cardTime,
           inspection:this.deadLine,
           strongrisk:this.strongRisk,
           nature:this.xinzhi,
           mortgage:this.diya,
           jiage:this.jiage,
           body:this.body,
           name:this.name,
           phone:this.mobile,
           openid:this.$store.state.openid,
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
        if (_this.flag === 'type') {
          _this.type=value
        }
        if(_this.flag === 'carColor'){
           _this.carColor=value
        }
        if(_this.flag === 'changeSpeed'){
           _this.changeSpeed=value
        }
        if(_this.flag === 'xinzhi'){
           _this.xinzhi=value
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
.box
  background #f6f6f6
.top65
  padding-top 1.28rem
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
.way
  padding 0 0.25rem   
  
  // vux
/*textarea*/
.box >>> .weui-cell
    background white
    font-size 0.3rem
    color #333
    line-height 1rem
    padding 0
    border-bottom 1px solid #eae7e7
    width calc(100% - 0.5rem)
    margin-left 0.25rem 
.leaaveSchool >>> .weui-cell
    border none!important
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
.box >>> .weui-cells:after,
.box >>> .weui-cells:before,
.box >>> .weui-cell:before,
.box >>> .weui-cell:after
   border none !important
.box >>> .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
  color #3d8afe!important 
.textarea 
  margin 0!important
  padding 0 .25rem!important
  
.box >>> .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
  color #3d8afe!important    
  /*radio*/
.box >>> .weui-icon-circle,
.box >>> .weui-icon-success
    font-size 0.32rem!important
.vux-check-icon 
   span
     font-size 0.28rem
/*出租*/

  .box >>>  .vux-check-icon
      float right
      margin-left 1rem
    
      
.box >>> .vux-cell-value
  font-size 0.28rem
  color #ccc
  font-weight nomal  
.box >>> .weui-cell_access .weui-cell__ft:after
  width 7px
  height 7px 
  border-width 1.1px 1.1px 0 0
  border-color #666
.box >>> .vux-no-group-title
  margin-top 0  
.box >>> .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
  color #3d8afe!important
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
// 工作经历
.work-box{
  background white
}
.work-experience
  height 2.15rem
  display flex
  justify-content  space-between
  width calc(100% - 0.5rem)
  box-sizing border-box
  align-items center
  
 margin-left 0.25rem 
  p:nth-child(1)
    font-size 0.26rem
    color #999
  p:nth-child(2)
    padding 0.2rem 0
    font-size 0.3rem
    color #333
  p:nth-child(3)
    font-size 0.28rem
    color #666
    i
      padding-right 0.44rem
.add
  height 1.92rem
  background white
  text-align center
  padding-top 0.4rem
  box-sizing border-box
  span
    width 1.26rem
    line-height 0.54rem
    display inline-block
    border-radius 5px
    border 1px solid #058cff
    font-size 0.26
    color #058cff
  p
    padding-top 0.24rem
    font-size .24rem
    color #ccc

</style>
