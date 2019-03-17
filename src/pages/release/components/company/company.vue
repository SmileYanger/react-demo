<template>
<div class="box">
  <header-bar :title="title"></header-bar>
  <div class="top65">
      <mt-field label="标题" placeholder="请输入标题" class="mt20" v-model="biaoti"></mt-field>

      <!--职位-->
      <mt-field label="公司名称" placeholder="请输入公司名称" class="border-bottom" v-model="company"></mt-field>

      <!-- 公司地址 -->
      <mt-field label="公司地址" placeholder="请输入公司地址" class="mt20" v-model="address">
        <i class="line">|</i>
       <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe609;</router-link >
      </mt-field> 

      <!-- 职位 -->
      <mt-field label="职位" placeholder="请输入职位名称" class="border-bottom" v-model="job"></mt-field>

     <!-- 售价 -->
      <div class="price mt20">
        <span>人数</span>
        <input type="text" placeholder="请输入人数" v-model='number'>
        <i class="yuan">人</i>
        <check-icon :value.sync="demo1"> {{ ('不限') }}</check-icon>
     </div>

    <!-- 学历 -->
     <mt-field label="学历"  class="border-bottom" @click.native="showModel(xl, 'xueli')"  v-model="xueli"  :key="xueli" readonly>
        <i class="iconfont arrow ">&#xe666;</i>
    </mt-field> 

    <!-- 经验 -->
     <mt-field label="经验"  class="border-bottom" @click.native="showModel(jy, 'jingyan')"  v-model="jingyan"  :key="jingyan" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
    </mt-field> 

      <!--期望薪资-->
     <mt-field label="期望薪资"  class="border-bottom" @click.native="showModel(xz, 'xinzi')"  v-model="xinzi"  :key="xinzi" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
    </mt-field>

   <!-- picker -->
     <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>
      
    <!--福利待遇-->
    <div class="rent-type mt20" >
      <div class="rent-type-title border-bottom">
           工作方式
        <check-icon :value.sync="all" > {{ ('全职') }}</check-icon>
        <check-icon :value.sync="part"> {{ ('兼职') }}</check-icon>
      </div>
      <span>福利待遇</span>
      <div>
          <span v-for='(item,index) in treatmentList' :class="{active:current===item.id}" @click='handelClick(index)' :key="item.id" ref="liId">{{item.name}}</span>
        </div>
    </div>

    <!-- 联系人 -->
    <mt-field label="联系人" placeholder="请输入联系人" class="border-bottom" v-model="name"></mt-field>

    <!-- 联系方式 -->
    <mt-field label="联系方式" placeholder="联系方式" class="mt20" v-model="mobile"></mt-field> 

    <!-- 职位详情 -->
    <x-textarea :max="200" :placeholder="('职位详情')" class="mt20" v-model="body"></x-textarea>
    <span class="submit" @click="submit">发布</span>     
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
  name: 'Company',
  components:{
    HeaderBar,
    Picker,
    alert
  },
  data () {
    return {
        current:'',
        treatmentList:[],
        configId:[],
        alertState:false,
        alertTip:'提示',
        biaoti:'',
        company:'',
        job:"",
        number:'',
        address:"",
        name:'',
        mobile:"",
        body:"",
        all:true,
        part:false,
        demo1:false,
        title:"企业招聘",
        modelState: false,
        xinzi:'请选择期望薪资',
        xueli:"请选择学历",
        jingyan:'请选择经验',        
        slots:[],
        flag: '',
        type:'',
        longs:'',
        lat:'',
         xz: [
            {
              flex: 1,
              values: ['面议','1000元/月以下','1000-2000元/月','2001-4000元/月','4001-6000元/月','6001-8000元/月','8001-10000元/月','10001-15000元/月','15001-25000元/月','25001-35000元/月','35001-50000元/月','50001-70000元/月','70001-100000元/月','100000元/月以上'],
              className: 'slot1',
              textAlign: 'center'
            }
         ],
         xl: [
            {
              flex: 1,
              values: ['高中以下','高中','中专/技校','大专','本科','硕士','博士'],
              className: 'slot1',
              textAlign: 'center'
            }
        ] ,
        jy: [
            {
              flex: 1,
              values: ['不限','1年以下','1-2年','3-5年','5-10年','10年以上'],
              className: 'slot1',
              textAlign: 'center'
            }
        ]         
      }
      
  },
   computed: {
    // 计算属性的 getter
//  part:function() {
//    return this.part=!this.all
////   var _this=this
//    get: function () {
//      
//    },
//    // setter
//    set: function (newValue) {
//      console.log(newValue)
//    }
 //}
  },
  methods: {
    showModel(txt, flag){
      this.modelState=true
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
    treatment(){
      this.$axios({  //福利待遇
        method: 'post',
        data:{
         do:'xinxi_refer',
         act:'welfare'   
        },
        }).then(res=>{
          console.log(res)
          this.treatmentList=res.data.datas
      })
    },
    handelClick(index){
      if(this.$refs.liId[index].className.length <= 0){
        this.$refs.liId[index].className = 'active';// 添加类
      }else{
        this.$refs.liId[index].className = '';// 选中再取消的情况
      }
      console.log(index)
      this.configId.push(index)
      console.log(this.configId)
    },
    submit(){
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
       // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if(this.all==true){
        this.type='全职'
      }else{
        this.type='兼职'
      }
      if (this.biaoti == '') {
         this.alertState=true
         this.alertTip = '请输入标题';
      } 
      else if (this.company  == '') {
         this.alertState=true
        this.alertTip = '请输入公司名称';
      }
       else if (this.address == '请选择地址') {
         this.alertState=true
        this.alertTip = '请选择地址';
      }
       else if (this.job == '') {
         this.alertState=true
        this.alertTip = '请输入职位名称';
      } 
      else if (this.number  == '') {
         this.alertState=true
        this.alertTip = '请输入招聘人数';
      } 
      else if (this.xueli == '请选择学历') {
         this.alertState=true
        this.alertTip = '请选择学历';
      } 
      else if (this.jingyan == '请选择经验') {
         this.alertState=true
        this.alertTip = '请选择经验';
      } 
      else if (this.xinzi == '请选择期望薪资') {
         this.alertState=true
        this.alertTip = '请选择期望薪资';
      } else if (this.configId.length == 0) {
         this.alertState=true
        this.alertTip = '请选择福利待遇';
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
       else if (this.body == '') {
        this.alertTip = '请输入职位详情';
         this.alertState=true
      }  else{
      this.$axios({  //企业招聘
        method: 'post',
        data:{
         do:'fabu',
         type:3,
         weid:this.$store.state.weid,
         zhiwei:this.job,
         name:this.name,
         phone:this.mobile,
         openid:this.$store.state.openid,
         qiye:this.company,
         renshu:this.number,
         xueli:this.xueli,
         gongzi:this.xinzi,
         body:this.body,
         gongzuo:this.type,
         longs:this.longs,
         lat:this.lat,
         address:this.address,
         welfare:this.configId.join(",")            
        },
        }).then(res=>{
          console.log(res)
         if(res.data.code==200){
              // this.$router.push('/')
          }
          if(res.data.code==402 || res.data.code==401){

            this.$router.push('/login')
          }
      })
    }
    }
 },
 mounted:function(){
      this.treatment()
      var _this=this
      this.bus.$on('',function(long,lat,address){
          console.log(long,lat,address)
          _this.longs=long
          _this.lat=lat
          _this.address=address
          console.log(_this.address)
      })
      this.bus.$on('change',function(value){
        if (_this.flag === 'xinzi') {
          _this.xinzi=value
        }
        if (_this.flag === 'xueli') {
          _this.xueli=value
        }
        if (_this.flag === 'jingyan') {
          _this.jingyan=value
        }
      })
      this.bus.$on('send',function(val){
        console.log(val)
        _this.alertState=val
      })
 },
   beforeRouteLeave (to, from, next) {
    console.log(to)
    console.log(from)
    // if(to.path=='/Home' || to.path=='/home'){
      from.meta.keepAlive=false
    // }
    next()
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
.active
  color #3d8afe!important
  border-color #3d8afe!important
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
    padding 0 0.1rem 0 0.2rem
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
// 价格
.price
  line-height 1rem
  width 100%
  border-right 0.25rem solid white
  border-left 0.25rem solid white
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
    margin-top 0.01rem
    
/*textarea*/
.box >>> .weui-cell
    background white
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
.box >>> .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
  color #3d8afe!important    
  /*radio*/
.box >>> .weui-icon-circle,
.box >>> .weui-icon-success
    font-size 0.32rem!important
.box >>> .vux-check-icon 
   span
     font-size 0.28rem 
/*出租*/
.rent-type
  padding 0 0.25rem
  box-sizing border-box
  background white
  .rent-type-title
  span
    line-height 1rem
    font-size .3rem
    color #333
    .vux-check-icon
      float right
      margin-left 1rem     
  div span
    padding 0 0.2rem
    line-height 0.5rem
    display  inline-block
    margin-right 0.2rem
    border-radius 0.06rem
    border 1px solid rgb(238,238,238)
    color #999
    margin-bottom .3rem
    font-size 0.26rem
  // 发布
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
