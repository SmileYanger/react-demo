<template>
<div class="box">
  <header-bar :title="title"></header-bar>
  <div class="top65">
      <mt-field label="标题" placeholder="请输入标题" class="mt20" v-model="biaoti"></mt-field>

      <!--职位-->
      <mt-field label="职位" placeholder="请输入职位名称" class="border-bottom" v-model="job"></mt-field>
      
      <!--期望薪资-->
      <mt-field label="期望薪资"  class="border-bottom" @click.native="showModel(xz, 'xinzi')"  v-model="xinzi"  :key="xinzi" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field> 

      <!--工作方式-->
      <mt-cell title="工作方式" class="mt20 way">
        <check-icon :value.sync="rentAll" name='aa'> {{ ('全职') }}</check-icon>
        <check-icon :value.sync="rentPart"  name='aa'> {{ ('兼职') }}</check-icon>
      </mt-cell>
      
       <!--工作经历-->
      <mt-cell title="工作经历" class="cell-box"></mt-cell>
      <div class="work-box" >
        <div class="work-experience border-bottom" v-show="showExperience" v-for="(item,index) in experienceList">
          <div>
            <p>{{item.jointime}}至{{item.finishitime}}</p>
            <p>{{item.company}}</p>
            <p><i>{{item.position}}</i>{{item.gongzi}}</p>
          </div>
          <i class="iconfont arrow ">&#xe666;</i>
        </div>
        <div class="add border-bottom mt20">
            <router-link tag="span" to="./workexperience">
                添加
            </router-link>
            <p>点击添加工作经验</p>
        </div>
      </div>
      
      <!--教育经历-->
      <mt-field label="教育经历" class="border-bottom" readonly></mt-field>
      <mt-field label="学校" placeholder="请输入学校名称"  class="border-bottom" v-model="school"></mt-field>
      <mt-field label="专业" placeholder="请输入专业名称"  class="border-bottom" v-model="major"></mt-field>

      <mt-field label="学历"  @click.native="showModel(xl, 'xueli')"  v-model="xueli"  :key="xueli" class="border-bottom">
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field> 

      <!-- 入学时间 -->
      <group >
        <datetime v-model="beginTime"  :title="('入学时间')"  ></datetime>
      </group>

      <!-- 毕业时间 -->
      <group class="mt20 leaaveSchool">
        <datetime v-model="endTime" format="YYYY-MM-DD"  :title="('毕业时间')" ></datetime>
      </group>

      <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>
         
      <mt-field label="性别" class=" border-bottom">
        <check-icon :value.sync="boy" > {{ ('男') }}</check-icon>
        <check-icon :value.sync="girl" > {{ ('女') }}</check-icon>
      </mt-field>
    
      <!-- 联系人 -->
      <mt-field label="姓名" placeholder="请输入姓名" class="border-bottom" v-model="name"></mt-field> 
    
       <!-- 年龄 -->
      <mt-field label="年龄" placeholder="请输入年龄" class="border-bottom" v-model="age"></mt-field>

       <!-- 联系方式 -->
      <mt-field label="联系方式" placeholder="电话号码" class="mt20" v-model="mobile"></mt-field>  

        <!--房屋详情-->
     <x-textarea :max="200" :placeholder="('自我评价')" class="mt20 textarea" v-model="body"></x-textarea>

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

  name: 'JobHunting',
  components:{
    HeaderBar,
    Picker,
    alert
  },
  data () {
    return {
        alertState:false,
        alertTip:'提示',
        showExperience:false ,
        experienceList:[],
        biaoti:'',
        job:'',
        school:'',
        major:'',
        name:'',
        age:'',
        mobile:'',
        body:'',
        rentAll:true,
        rentPart:false,
        boy:true,
        sex:'',
        girl:false,
        demo1:false,
        title:"个人求职",
        modelState: false,
        xinzi:'请选择期望薪资',
        xueli:"请选择学历",
        beginTime:'请选择入学时间',
        endTime:'请选择毕业时间',          
        slots:[],
        flag: '',
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
    submit(){
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
       // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if(this.all==true){
        this.type='全职'
      }else{
        this.type='兼职'
      }
      if(this.boy){
        this.sex='男'
      }else{
        this.sex='女'
      }
      if (this.biaoti == '') {
         this.alertState=true
         this.alertTip = '请输入标题';
      } 
       else if (this.job == '') {
         this.alertState=true
        this.alertTip = '请输入职位名称';
      } 
      else if (this.xinzi == '请选择期望薪资') {
         this.alertState=true
        this.alertTip = '请选择期望薪资';
      }
      else if (this.school == '') {
         this.alertState=true
        this.alertTip = '请输入学校名称';
      }
      else if (this.major == '') {
         this.alertState=true
         this.alertTip = '请输入专业名称';
      }
      else if (this.xueli == '请选择学历') {
         this.alertState=true
        this.alertTip = '请选择学历';
      } 

      else if (this.beginTime == '请选择入学时间') {
         this.alertState=true
        this.alertTip = '请选择入学时间';
      } 
      else if (this.endTime == '请选择毕业时间') {
         this.alertState=true
        this.alertTip = '请选择毕业时间';
      } 
       else if (this.name == '') {
         this.alertState=true
        this.alertTip = '请输入联系人';
      }
       else  if (!myreg.test(this.mobile)) {
         this.alertState=true
         this.alertTip = '请输入正确的联系方式';
      }
       else if (this.age == '') {
         this.alertState=true
        this.alertTip = '请输入年龄';
      }

      else if (this.mobile == '') {
         this.alertState=true
        this.alertTip = '请输入手机号';
      }
     
       else if (this.body == '') {
        this.alertTip = '请输入职位详情';
         this.alertState=true
      }
       else{
      this.$axios({  //企业招聘
        method: 'post',
        data:{
         do:'fabu',
         type:4,
         weid:this.$store.state.weid,
         name:this.name,
         phone:this.mobile,
         openid:this.$store.state.openid,
         gongzi:this.xinzi,
         age:this.age,
         sex:this.sex,
         zhiwei:this.job,
         school_name:this.school,
         school_major:this.name,
         xueli:this.xueli,
         body:this.body,
         gongzuo:this.type,
         jointime:this.beginTime,
         finishitime:this.endTime,
         work:Base64.encode(this.experienceList)
          
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
 mounted (){ 
      // this.showExperience=   
      console.log(this.showExperience)  
      var _this=this
      this.bus.$on('mm',function(val,show){
        _this.showExperience=show
        console.log(_this.showExperience)
        _this.experienceList.push(val)
      })
      this.bus.$on('change',function(value){
        if (_this.flag === 'xinzi') {
          _this.xinzi=value
        }
        if (_this.flag === 'xueli') {
          _this.xueli=value
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
  width 7px
  height 7px 
  border-width 1.1px 1.1px 0 0
  border-color #666
.box >>> .weui-cells
  margin-top 0
  width calc(100% - 0.5rem)
  margin-left 0.25rem 
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
