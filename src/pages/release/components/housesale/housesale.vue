<template>
    <div class="box">
        <header-bar :title="title"></header-bar>
        <div class="top65">
            <mt-field label="标题" placeholder="请输入标题" class="mt20" v-model="sell.biaoti"></mt-field>

            <!--小区-->
            <mt-field label="小区" placeholder="请输入小区名称" class="border-bottom"  v-model="sell.xiaoqu"></mt-field> 

            <!--区域-->
            <mt-field label="区域"  class="mt20" v-model="sell.address" readonly placeholder="请选择地址">
                <i class="line">|</i>
                <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe609;</router-link >
            </mt-field> 
            <!-- 面积    -->
            <mt-field label="面积" placeholder="请输入面积" class="border-bottom" v-model="sell.mianji">
                <span class="budge">平米</span>
            </mt-field> 

             <!-- 户型   -->
            <mt-field label="户型"  class="border-bottom" @click.native="showModel(hx, 'huxing')"  v-model="sell.huxing"  :key="sell.huxing" readonly>
                <i class="iconfont arrow ">&#xe666;</i>
            </mt-field> 

              <!-- 楼层   -->
            <mt-field label="楼层"  class="border-bottom" @click.native="showModel(lc, 'louceng')"  v-model="sell.louceng"  :key="sell.louceng" readonly>
                <i class="iconfont arrow ">&#xe666;</i>
            </mt-field> 

            <!-- 装修   -->
            <mt-field label="装修"  class="border-bottom" @click.native="showModel(zx, 'zhuangxiu')"  v-model="sell.zhuangxiu" :key="sell.zhuangxiu" readonly>
                <i class="iconfont arrow ">&#xe666;</i>
            </mt-field>

            <!-- 朝向   -->
            <mt-field label="朝向"  class="border-bottom" @click.native="showModel(cx, 'chaoxiang')"  v-model="sell.chaoxiang" :key="sell.chaoxiang" readonly>
                <i class="iconfont arrow ">&#xe666;</i>
            </mt-field>
              
            <!-- picker组件 -->
            <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>
          
            <!-- 售价 -->
            <div class="price mt20">
              <span>售价</span>
              <input type="text" placeholder="请输入金额" v-model="sell.jiage">
              <i class="yuan">元</i>
              <check-icon :value.sync="sell.demo1"> {{ ('面议') }}</check-icon>
            </div>
            
            <!--房屋详情-->
           <x-textarea :max="200" :placeholder="('房屋详情')" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" class="mt20" v-model="sell.body"></x-textarea>
            
             <!-- 联系人 -->
            <mt-field label="联系人" placeholder="姓名" class="border-bottom" v-model="sell.name"></mt-field> 

             <!-- 联系方式 -->
            <mt-field label="联系方式" placeholder="电话号码" class="border-bottom" v-model="sell.mobile"></mt-field>
            
            <!--上传组件-->
            <div class="house-pic">
                <p class="pic-title">房源照片 <i>（最多上传12张）</i></p>
                <up-loader  @fuImg="fuu" :empty="empty"></up-loader>
                <span class="submit" @click="submit">发布</span>
            </div>
        </div>
        <!-- alert弹框 -->
        <alert v-show="alertState" :alertTip="alertTip"></alert> 
    </div>
</template>

<script>
import Picker from 'common/picker.vue'
import HeaderBar from 'common/headerbar.vue'
import UpLoader from 'common/uploader.vue'
import alert from 'common/alert.vue'
import Vue from 'vue'
Vue.prototype.bus=new Vue()
export default {

  name: 'HouseSale',
  components:{
    HeaderBar,
    Picker,
    UpLoader,
    alert
  },
 
  data () {
    return {
      emptyImg:'emptyImg',
      alertState:false,
      alertTip:'提示',      
      sell:{        
        xiaoqu:'',
        biaoti:'', 
        address:'',
        jiage:"",
        body:'',
        mianji:'',
        name:'',
        mobile:'',
        louceng1:'',
        louceng2:'',
        agree:"面议",
        demo1:false,            
        huxing:'请选择户型',
        louceng:'请选择楼层',
        zhuangxiu:'请选择装修类型',
        chaoxiang:'请选择朝向',       
        img:'',
        filelist:[],
      },      
      title:"房屋出售", 
      modelState: false,          
      slots:[],
      longs:'',
      lat:'',
      flag: '',      
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
    }
  },

  methods: {
    fuu(val){
      console.log(val)
      this.sell.img=val
      this.sell.filelist.push( this.sell.img)
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
     onEvent (event) {
      console.log('on', event)
    },
    sure(){
      this.alertState=false
    },
    submit(){
      this.sell.louceng1=this.sell.louceng.substring(0,2)
      this.sell.louceng2=this.sell.louceng.substring(4,6)
      if(this.sell.demo1){
        this.sell.jiage='面议'
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      // var myreg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if (this.sell.biaoti == '') {
         this.alertState=true
         this.alertTip = '请输入标题';
      } else if (this.sell.xiaoqu  == '') {
         this.alertState=true
        this.alertTip = '请输入小区名称';
      } else if (this.sell.address == '请选择地址') {
         this.alertState=true
         this.alertTip = '请选择地址';
      } else if (this.sell.mianji == '') {
         this.alertState=true
        this.alertTip = '请输入面积';
      } else if (this.sell.huxing  == '请选择户型') {
         this.alertState=true
        this.alertTip = '请选择户型';
      } else if (this.sell.louceng == '请选择楼层') {
         this.alertState=true
        this.alertTip = '请选择楼层';
      } else if (this.sell.zhuangxiu == '请选择装修类型') {
         this.alertState=true
        this.alertTip = '请选择装修类型';
      } else if (this.sell.chaoxiang == '请选择朝向') {
         this.alertState=true
        this.alertTip = '请选择朝向';
      } else if (this.sell.jiage == '') {
         this.alertState=true
        this.alertTip = '请填价格';
      } else if (this.sell.body == '') {
        this.alertTip = '请输入房屋详情';
         this.alertState=true
      } else if (this.sell.name == '') {
         this.alertState=true
        this.alertTip = '请输入联系人';
      }else if (this.sell.mobile == '') {
         this.alertState=true
        this.alertTip = '请输入手机号';
      } else  if (!myreg.test(this.sell.mobile)) {
         this.alertState=true
         this.alertTip = '请输入正确的联系方式';
      }
      else if (this.sell.filelist.length == 0) {
         this.alertState=true
         this.alertTip = '请上传房源照片';
      }  else if(this.sell.img==''){
         this.alertTip = '图片上传中...';
         this.alertState=true
      }
         else {
         this.alertState=false
         this.$axios({  //首页列表页
        method: 'post',
        data:{
         do:'fabu',
         type:1,
         weid:this.$store.state.weid,
         title:this.sell.biaoti,
         name:this.sell.name,
         phone:this.sell.mobile,
         openid:this.$store.state.openid,
         huxing:this.sell.huxing,
         louceng_1: this.sell.louceng1,
         louceng_2: this.sell.louceng2,
         jiage:this.sell.jiage,
         zhuangxiu:this.sell.zhuangxiu,
         mianji:this.sell.mianji,
         body:this.sell.body,
         address:this.sell.address,
         longs:this.longs,
         lat:this.lat,
         orientation:this.sell.chaoxiang,
         village:this.sell.xiaoqu,
         filelist:this.sell.filelist.join(",")
        },
        }).then(res=>{
          console.log(res)

          if(res.data.code==200){  
              this.emptyImg='emptyImg'           
              this.$router.push('/')
              this.sell={        
                xiaoqu:'',
                biaoti:'', 
                address:'',
                jiage:"",
                body:'',
                mianji:'',
                name:'',
                mobile:'',
                louceng1:'',
                louceng2:'',
                agree:"面议",
                demo1:false,            
                huxing:'请选择户型',
                louceng:'请选择楼层',
                zhuangxiu:'请选择装修类型',
                chaoxiang:'请选择朝向',       
                img:'',
                filelist:[]
              },
              console.log(this.sell.filelist)
          }
          if(res.data.code==402 || res.data.code==401){
            this.$router.push('/login')
          }
         
      })
    }
      
    }
 },
 mounted:function(){
      var _this=this
     this.bus.$on('',function(long,lat,address){
          console.log(long,lat,address)
          _this.longs=long
          _this.lat=lat
          _this.sell.address=address
          console.log( _this.sell.address)
      })
      this.bus.$on('change',function(value){
        if (_this.flag === 'huxing') {
          _this.sell.huxing=value          
        }
        if(_this.flag === 'louceng'){
           _this.sell.louceng=value
           _this.sell.louceng1=value.substring(0,2)
           _this.sell.louceng1=value.substring(4,5)
        }
        if(_this.flag === 'zhuangxiu'){
           _this.sell.zhuangxiu=value
        }
        if(_this.flag === 'chaoxiang'){
           _this.sell.chaoxiang=value
        }
      })
      this.bus.$on('',function(values){
          console.log(values)
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
    // line-height 1rem
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
