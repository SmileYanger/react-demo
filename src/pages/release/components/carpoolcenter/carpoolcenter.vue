<template>
<div class="box">
  <header-bar :title="title"></header-bar>
  <div class="top65">
      <!--拼车类型-->
    <mt-field label="工作方式" class=" mt20 ">
      <check-icon :value.sync="car"  @click.native='findCar'> {{ ('人找车') }}</check-icon>
      <check-icon :value.sync="person" @click.native='findPerson'> {{ ('车找人') }}</check-icon>
    </mt-field>

    <!-- 人找车 -->
    <div v-show="car">
      <mt-field label="出发地" placeholder="请输入出发地" class="start" v-model="start" ></mt-field>
      <mt-field label="目的地" placeholder="请输入目的地" class="end mt20" v-model="end"></mt-field>
      <group >
          <datetime v-model="departuretime" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" :title="('发车时间')"></datetime>
        </group>
        <mt-field label="乘车人数"  class="border-bottom" @click.native="showModel(number, 'personnumber')"  v-model="personnumber"  :key="personnumber" readonly>
            <i class="iconfont arrow ">&#xe666;</i>
      </mt-field> 
      <mt-field label="发车地点" placeholder="请输入发车地点" class="border-bottom" v-model="address" readonly>
        <i class="line">|</i>
       <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe609;</router-link >
      </mt-field>   
      <x-textarea :max="200" :placeholder="('备注说明')" class="mt20" v-model="body"></x-textarea>
      <mt-field label="联系人" placeholder="姓名" class="border-bottom" v-model="name"></mt-field>
      <mt-field label="联系方式" placeholder="电话号码" class="border-bottom mt20" v-model="mobile"></mt-field> 
      <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker> 
      <span class="submit"  @click='submit'>人找车</span>
    </div>
    
    <!-- 车找人 -->
    <div v-show="person">
      <mt-field label="出发地" placeholder="请输入出发地" class="start" v-model='start'></mt-field>
      <mt-field label="目的地" placeholder="请输入目的地" class="end mt20" v-model="end"></mt-field>
      <mt-field label="途径地点" placeholder="请输入途径地点" class="border-bottom" v-model="pass"></mt-field>
      <group >
          <datetime v-model="departuretime" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" :title="('发车时间')"></datetime>
      </group>
      <mt-field label="空余座位"  class="border-bottom" @click.native="showModel(seat, 'leftseat')"  v-model="leftseat"  :key="leftseat" readonly>
            <i class="iconfont arrow ">&#xe666;</i>
      </mt-field> 
      <mt-field label="发车地点" placeholder="请输入发车地点" class="border-bottom" v-model="address" readonly>
        <i class="line">|</i>
        <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe609;</router-link >
      </mt-field>   
      <mt-field label="人均费用" placeholder="请输入人均费用" class="border-bottom" v-model="jiage">
          <span class="budge">元 / 人</span>
      </mt-field> 
      <mt-field label="车型" placeholder="请输入车型"  class="mt20" v-model="carType"></mt-field>
      <x-textarea :max="200" :placeholder="('备注说明')" class="mt20" v-model='body'></x-textarea>
      <mt-field label="联系人" placeholder="姓名" class="border-bottom" v-model='name'></mt-field>
      <mt-field label="联系方式" placeholder="电话号码" class="border-bottom mt20" v-model='mobile'></mt-field> 
      <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker> 
      <span class="submit" @click='submit'>车找人</span>
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
import alert from 'common/alert.vue'

export default {
  name: 'CarpoolCenter',
  components:{
    HeaderBar,
    Picker ,
    alert          
  },
  data () {
    return { 
    alertState:false,
        alertTip:'提示', 
      pass:'',
      jiage:'',
      carType:'',
        person:false,
        car:true,
        start:'',
        end:'',
        address:'',
        body:'',
        name:'',
        mobile:'',
        longs:'',
        lat:'',
        title:"拼车中心",
        modelState: false,
        departuretime:'请选择发车时间',
        leftseat:'请选择空余座位',
        carmodel:'请选择车型',
        personnumber:'请选择乘车人数',       
        slots:[],
        flag: '',
         seat: [
            {
              flex: 1,
              values: ['1座','2座','3座','4座','5座','6座','7座','其他'],
              className: 'slot1',
              textAlign: 'center'
            }
        ] ,
        number: [
            {
              flex: 1,
              values: ['1人','2人','3人','4人','5人','6人','7人'],
              className: 'slot1',
              textAlign: 'center'
            }
        ]    

      }
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
    findCar(){
      this.car=true
      this.person=false
      this.start=''
      this.end=''
      this.departuretime=''
      this.body=''
      this.name=''
      this.mobile=''
      this.address=''
    },
    findPerson(){
      this.car=false
      this.person=true
      this.start=''
      this.end=''
      this.departuretime=''
      this.body=''
      this.name=''
      this.mobile=''
      this.address=''
    },
    sure(){
      this.alertState=false
    },
    submit(){
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
       // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if(this.person){
         if (this.start == '') {
             this.alertState=true
             this.alertTip = '请输入出发地';
          } else if (this.end  == '') {
             this.alertState=true
            this.alertTip = '请输入目的地';
          } else if (this.pass  == '') {
             this.alertState=true
            this.alertTip = '请输入途径地点';
          }
          else if (this.departuretime  == '请选择发车时间') {
             this.alertState=true
            this.alertTip = '请选择发车时间';
          }
           else if (this.leftseat  == '请选择空余座位') {
             this.alertState=true
            this.alertTip = '请选择空余座位';
          }
           else if (this.end  == '') {
             this.alertState=true
            this.alertTip = '请输入目的地';
          }
          else if (this.address  == '') {
             this.alertState=true
            this.alertTip = '请输入发车地点';
          }
          else if (this.jiage  == '') {
             this.alertState=true
            this.alertTip = '请输入费用';
          }
          else if (this.carType  == '') {
             this.alertState=true
            this.alertTip = '请输入车型';
          }
          else if (this.body  == '') {
             this.alertState=true
            this.alertTip = '请输入备注说明';
          }
          else if (this.name  == '') {
             this.alertState=true
            this.alertTip = '请输入联系人';
          }
           else  if (!myreg.test(this.mobile)) {
             this.alertState=true
             this.alertTip = '请输入正确的联系方式';
          }      
           else if (this.mobile  == '') {
             this.alertState=true
             this.alertTip = '请输入联系方式';
          }else{
            this.$axios({  //车找人
              method: 'post',
              data:{
               do:'car_sharing',
               act:'Someone',
               weid:this.$store.state.weid,
               start:this.start,
               bourn:this.end,
               go_time:this.departuretime,
               number:this.personnumber,
               site:this.address,
               longs:this.longs,
               lat:this.lat,
               remark:this.body,
               linkman:this.name,
               phone:this.mobile,
               pass:this.pass,
               cost:this.jiage,
               vehicle:this.carType,
               openid:this.$store.state.openid,
              },
              }).then(res=>{
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
      }else
      {
        if (this.start == '') {
             this.alertState=true
             this.alertTip = '请输入出发地';
          }
           else if (this.end  == '') {
             this.alertState=true
            this.alertTip = '请输入目的地';
          }
          else if (this.departuretime  == '请选择发车时间') {
             this.alertState=true
            this.alertTip = '请选择发车时间';
          }
           else if (this.personnumber  == '请选择乘车人数') {
             this.alertState=true
            this.alertTip = '请选择乘车人数';
          }
          else if (this.address  == '') {
             this.alertState=true
            this.alertTip = '请输入发车地点';
          }
          else if (this.body  == '') {
             this.alertState=true
            this.alertTip = '请输入备注说明';
          }
          else if (this.name  == '') {
             this.alertState=true
            this.alertTip = '请输入联系人';
          }
           else if (this.mobile  == '') {
             this.alertState=true
             this.alertTip = '请输入联系方式';
          }else{
            this.$axios({  //人找车
            method: 'post',
            data:{
             do:'car_sharing',
             act:'mancar',
             weid:this.$store.state.weid,
             start:this.start,
             bourn:this.end,
             go_time:this.departuretime,
             number:this.personnumber,
             site:this.address,
             longs:this.longs,
             lat:this.lat,
             remark:this.body,
             linkman:this.name,
             phone:this.mobile,
             openid:this.$store.state.openid,
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
    }    
 },
 mounted:function(){
  var _this=this
      this.bus.$on('',function(long,lat,address){
          console.log(long,lat,address)
          _this.longs=long
          _this.lat=lat
          _this.address=address
          console.log(_this.address)
      })
      
      this.bus.$on('change',function(value){
        if (_this.flag === 'leftseat') {
          _this.leftseat=value
        }
        if (_this.flag === 'personnumber') {
          _this.personnumber=value
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
.box >>> .vux-check-icon 
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
  width 8px
  height 8px 
  border-width 1.1px 1.1px 0 0
  border-color #666
.box >>> .weui-cells
  margin-top 0
.box >>> .vux-no-group-title
  margin-top 0  
.box >>> .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
  color #3d8afe!important
.box >>> .dp-item.dp-right
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
.start
  border-bottom 1px solid #eae6e6
.start:before,
.end:before
  content '●'!important
  color #3d8afe!important
  line-height 1rem
  padding-right 0.15rem
  font-size .4rem
.end:before
  color red!important
</style>
