<template>
<div class="box">
  <header-bar :title="title"></header-bar>
  <div class="top65">
      <mt-field label="标题" placeholder="请输入标题" class="mt20" v-model="rent.biaoti"></mt-field>

      <!--小区-->
      <mt-field label="小区" placeholder="请输入小区名称"  class="border-bottom" v-model="rent.xiaoqu"></mt-field>
      
      <!--区域-->
      <mt-field label="区域" placeholder="请输入详细地址" class="mt20" v-model="rent.address">
        <i class="line">|</i>
        <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe609;</router-link >
      </mt-field>    
 
      <!-- 面积 -->
      <mt-field label="面积" placeholder="请输入面积" class="border-bottom" v-model="rent.mianji">
        <span class="budge">平米</span>
      </mt-field> 

     <!-- 户型   -->
      <mt-field label="户型"  class="border-bottom" @click.native="showModel(hx, 'huxing')"  v-model="rent.huxing"  :key="rent.huxing" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>
      
      <!-- 楼层   -->
      <mt-field label="楼层"  class="border-bottom" @click.native="showModel(lc, 'louceng')"  v-model="rent.louceng"  :key="rent.louceng" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>
      
      <!-- 装修   -->
      <mt-field label="装修"  class="border-bottom" @click.native="showModel(zx, 'zhuangxiu')"  v-model="rent.zhuangxiu" :key="rent.zhuangxiu" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>
      
      <!-- 朝向   -->
      <mt-field label="朝向"  class="border-bottom" @click.native="showModel(cx, 'chaoxiang')"  v-model="rent.chaoxiang" :key="rent.chaoxiang" readonly>
          <i class="iconfont arrow ">&#xe666;</i>
      </mt-field>

      <!-- picker -->
      <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>
      
    <!-- 售价 -->
      <div class="price border-bottom">
        <span>租金</span>
        <input type="text" placeholder="请输入金额" v-model="rent.jiage">
        <i class="yuan">元/月</i>
        <check-icon :value.sync="demo1"> {{ ('面议') }}</check-icon>
      </div>
    
    <!-- 交租   -->
    <mt-field label="交租"  class="mt20" @click.native="showModel(rt, 'rent')"  v-model="rent.rent" :key="rent">
        <i class="iconfont arrow ">&#xe666;</i>
    </mt-field>
    
    <!--出租方式-->
    <div class="rent-type mt20" >
      <div class="rent-type-title border-bottom">
           出租方式
          <check-icon :value.sync="all" name="aa"> {{ ('整租') }}</check-icon>
        <check-icon :value.sync="rentPart"  name="aa"> {{ ('合租') }}</check-icon>
      </div>
      <span>房屋配置</span>
      <div>
          <span v-for="(item,index) in rent.peizhiList" :class="{active:current===item.id}" @click='handelClick(index)' :key="item.id" ref="liId">
            {{item.name}}
          </span>
        </div>
    </div>

    <!--房屋详情-->
   <x-textarea :max="200" :placeholder="('房屋详情')" class="mt20" v-model='rent.body'> </x-textarea>
    
     <!-- 联系人 -->
    <mt-field label="联系人" placeholder="姓名" class="border-bottom" v-model="rent.name"></mt-field> 

     <!-- 联系方式 -->
    <mt-field label="联系方式" placeholder="电话号码" class="border-bottom mt20" v-model="rent.mobile"></mt-field>
    
    <!--上传组件-->
    <div class="house-pic">
        <p class="pic-title">房源照片 <i>（最多上传12张）</i></p>
        <up-loader  @fuImg="fuu" :empty='empty'></up-loader>
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

  name: 'HouseRentals',
  components:{
    HeaderBar,
    Picker,
    UpLoader,
    alert
  },
  data () {
    return {
          current:'',
          alertState:false,
          alertTip:'提示',
          empty:'empty',
           title:"房屋出租",
           modelState: false,
            rentAll:true,
            rentPart:false,
            demo1:false,
          rent:{
            biaoti:'',
            xiaoqu:'',
            address:'',
            mianji:'',
            jiage:'',
            body:'',
            name:'',
            mobile:'',
           
           
            
            huxing:'请选择户型',
            louceng:'请选择楼层',
            longceng1:'',
            louceng2:'',
            zhuangxiu:'请选择装修类型',
            chaoxiang:'请选择朝向',
            rent:'请选择交租方式',
            peizhiList:[],
          },
          
          slots:[],
          flag: '',
          longs:'',
          lat:'',
          filelist:[],
         
          configId:[],
          hx: [
              {
                flex: 1,
                values: ['一室','二室','三室','四室'],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex:  1,
              }, {
                divider: true,
                content: ' ',
                className: 'slot2'
              }, {
                flex: 1,
               values: ['0厅','1厅','2厅','3厅'],
                className: 'slot3',
                textAlign: 'center'
              }, {
                divider: true,
                content: ' ',
                className: 'slot4'
              },{
                flex: 1,
                values: ['0卫','1卫','2卫','3卫'],
                className: 'slot5',
                textAlign: 'center'
              }
          ],
          lc: [
            {
              flex: 1,
              values: ['一楼','二楼','三楼','四楼'],
              className: 'slot1',
              textAlign: 'center'
            }, {
              divider: true,
              content: ' ',
              className: 'slot2'
            }, {
              flex: 1,
             values: ['共1层','共2层','共3层','共4层'],
              className: 'slot3',
              textAlign: 'center'
            }
          ],
          zx: [
              {
                flex: 1,
                values: ['毛坯','简单装修','中等装修','精装修','豪华装修'],
                className: 'slot1',
                textAlign: 'center'
              }
          ],
          cx: [
              {
                flex: 1,
                values: ['东','南','西','北','南北','东西','东南','西南','东北','西北'],
                className: 'slot1',
                textAlign: 'center'
              }
           ],
           rt: [
              {
                flex: 1,
                values: ['押一付一','押一付三','半年付','年付'],
                className: 'slot1',
                textAlign: 'center'
              }
           ]
          
          
      }
  },
  computed: {
    // 计算属性的 getter
    all: function () {
      // `this` 指向 vm 实例
      return this.rentAll=!this.rentPart
    }
  },
  methods: {
     fuu(val){
      console.log(val)
      this.filelist.push(val)
      console.log(this.filelist)
      },
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
    peizhi(){
       this.$axios({  //房屋配置
        method: 'post',
        data:{
         do:'xinxi_refer',
         act:'configure'
        },
        }).then(res=>{
          console.log(res)
          this.rent.peizhiList=res.data.datas
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
      this.rent.louceng1=this.rent.louceng.substring(0,2)
      this.rent.louceng2=this.rent.louceng.substring(4,6)
       var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
       // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if(this.rentPart==true){
        this.rents='合租'
      }else{
        this.rents='整租'
      }
      if (this.rent.biaoti == '') {
         this.alertState=true
         this.alertTip = '请输入标题';
      } else if (this.rent.xiaoqu  == '') {
         this.alertState=true
        this.alertTip = '请输入小区名称';
      } else if (this.rent.address == '请选择地址') {
         this.alertState=true
        this.alertTip = '请选择地址';
      } else if (this.rent.mianji == '') {
         this.alertState=true
        this.alertTip = '请输入面积';
      } else if (this.rent.huxing  == '请选择户型') {
         this.alertState=true
        this.alertTip = '请选择户型';
      } else if (this.rent.louceng == '请选择楼层') {
         this.alertState=true
        this.alertTip = '请选择楼层';
      } else if (this.rent.zhuangxiu == '请选择装修类型') {
         this.alertState=true
        this.alertTip = '请选择装修类型';
      }       
      else if (this.rent.chaoxiang == '请选择朝向') {
         this.alertState=true
        this.alertTip = '请选择朝向';
      } else if (this.rent.jiage == '') {
         this.alertState=true
        this.alertTip = '请填价格';
      }
      else if (this.rent.rent == '请选择交租方式') {
         this.alertState=true
        this.alertTip = '请选择交租方式';
      }
       else if (this.configId.length == 0) {
         this.alertState=true
        this.alertTip = '请选择房屋配置';
      }
       else if (this.rent.body == '') {
        this.alertTip = '请输入房屋详情';
         this.alertState=true
      } else if (this.rent.name == '') {
         this.alertState=true
        this.alertTip = '请输入联系人';
      }else if (this.rent.mobile == '') {
         this.alertState=true
        this.alertTip = '请输入手机号';
      } else  if (!myreg.test(this.mobile)) {
         this.alertState=true
         this.alertTip = '请输入正确的联系方式';
      }
       else if (this.filelist.length == 0) {
         this.alertState=true
        this.alertTip = '请上传房源照片';
      }  else {
      this.alertState=false
      this.$axios({  //房屋出售
        method: 'post',
        data:{
         do:'fabu',
         type:2,
         weid:this.$store.state.weid,
         title:this.rent.biaoti,
         name:this.rent.name,
         phone:this.rent.mobile,
         openid:this.$store.state.openid,
         huxing:this.rent.huxing,
         louceng_1: this.rent.louceng1,
         louceng_2: this.rent.louceng2,
         jiage:this.rent.jiage,
         zhuangxiu:this.rent.zhuangxiu,
         mianji:this.rent.mianji,
         zujin:this.rent.rent,
         body:this.rent.body,
         address:this.rent.address,
         longs:this.longs,
         lat:this.lat,
         orientation:this.rent.chaoxiang,
         configure:this.configId.join(","),
         rents:this.rent.rents,
         village:this.rent.xiaoqu,
         filelist:this.filelist.join(",")
        },
        }).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.
              this.$router.push('/')
              this.emptyImg=''
              
          }
          if(res.data.code==402 || res.data.code==401){

            this.$router.push('/login')
          }
      })
    }}
 },
 mounted:function(){
      this.peizhi()
      var _this=this
       this.bus.$on('',function(long,lat,address){
          console.log(long,lat,address)
          _this.longs=long
          _this.lat=lat
          _this.rent.address=address
          console.log(_this.rent.address)
      })
      this.bus.$on('change',function(value){
        if (_this.flag === 'huxing') {
          _this.rent.huxing=value
        }
        if(_this.flag === 'louceng'){
           _this.rent.louceng=value
        }
        if(_this.flag === 'zhuangxiu'){
           _this.rent.zhuangxiu=value
        }
        if(_this.flag === 'chaoxiang'){
           _this.rent.chaoxiang=value
        }
        if(_this.flag === 'rent'){
           _this.rent.rent=value
        }
      })
      this.bus.$on('send',function(val){
        console.log(val)
        _this.alertState=val
      })
 },


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
.mt20
     margin-bottom 0.2rem
.active
  color #3d8afe!important
  border-color #3d8afe!important
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
