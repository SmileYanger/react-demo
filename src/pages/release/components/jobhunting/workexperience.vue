<template>
<div class="box">
  <div class="title border-bottom">
    <i class="iconfont" @click="Goback">&#xe671;</i>
    工作经历
    <span @click='save'>保存</span>
  </div>
  <div>
      <mt-field label="公司名称" placeholder="请输入公司名称" class="border-bottom" v-model="company "></mt-field>
       <!-- 入学时间 -->
      <group class="border-bottom">
        <datetime v-model="jointime"  :title="('开始时间')"></datetime>
      </group>

      <!-- 毕业时间 -->
      <group class="border-bottom mt20">
        <datetime v-model="finishitime" format="YYYY-MM-DD"  :title="('结束时间')"></datetime>
      </group>

      <!-- 岗位名称 -->
     <mt-field label="岗位名称" placeholder="请输入岗位名称" class="border-bottom" v-model="position"></mt-field>
      <mt-field label="行业" placeholder="请输入行业名称" class="border-bottom" v-model="major"></mt-field>
     <mt-field label="薪资" placeholder="请输入薪资" class="border-bottom mt20" v-model="gongzi"></mt-field>

      <!-- 工作描述 -->
      <x-textarea :max="200" :placeholder="('工作描述')"  class="desc" v-model="content"></x-textarea>         
  </div>
  <!-- alert组件 -->
  <alert v-show="alertState" :alertTip="alertTip"></alert>
</div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.bus=new Vue()
import alert from 'common/alert.vue'
export default {
  name: 'WorkExperience',
  components:{
    alert
  },
  data () {
    return {  
        alertState:false,
        alertTip:'提示',
        title:"工作经验",
        modelState: false,
        jointime:'请选择入学时间',
        finishitime:'请选择毕业时间',          
        slots:[],
        flag: '',
        company:"",
        position:'',
        major:'',
        gongzi:'',       
        content:'',
         show:true,
         xz: [
            {
              flex: 1,
              values: ['面议','1000元/月以下','1000-2000元/月','2001-4000元/月','4001-6000元/月','6001-8000元/月','8001-10000元/月','10001-15000元/月','15001-25000元/月','25001-35000元/月','35001-50000元/月','50001-70000元/月','70001-100000元/月','100000元/月以上'],
              className: 'slot1',
              textAlign: 'center'
            }
         ],
         experience:
           {
            company:'',
            jointime:"",
            finishitime:'',
            position:'',
            major:'',
            gongzi:'',
            content:'',           
           },
         
      }
  },
  methods:{
     Goback(){
      this.$router.go(-1)     
      // this.bus.$emit('send',this.experience)
      // console.log(this.experience,this.show)
      // this.$router.push({path:'/jobhunting',query:{ experience:this.experience,show:this.show}})
    },
    save(){
      if(this.company==''){
        this.alertState=true
        this.alertTip='请输入公司名称'
      } else if(this.beginTime=='请选择入学时间'){
        this.alertState=true
        this.alertTip='请选择入学时间'
      }else if(this.endTime=='请选择毕业时间'){
        this.alertState=true
        this.alertTip='请选择毕业时间'
      }
      else if(this.job==''){
        this.alertState=true
        this.alertTip='请输入岗位名称'
      }
      else if(this.hangye==''){
        this.alertState=true
        this.alertTip='请输入行业名称'
      }
      else if(this.xinzi==''){
        this.alertState=true
        this.alertTip='请输入期望薪资'
      }
      else if(this.body==''){
        this.alertState=true
        this.alertTip='请输入工作描述'
      }else{
        this.experience.company=this.company,
        this.experience.jointime=this.jointime,
        this.experience.finishitime=this.finishitime,
        this.experience.position=this.position,
        this.experience.major=this.major,
        this.experience.gongzi=this.gongzi,
        this.experience.content=this.content
        this.$router.go(-1)     
        this.bus.$emit('mm',this.experience,this.show)
      }
    },
    mounted(){
      var _this=this
       this.bus.$on('send',function(val){
        console.log(val)
        _this.alertState=val
      })
    }
  }

}
</script>

<style lang="stylus" scoped>

.box
  background #f6f6f6

.box >>> .mint-radiolist-title
  margin 0
.box >>> .mint-cell-title
  width 70px
.box >>> .mint-cell-wrapper
  padding 0 0.24rem
  line-height 1rem
  background-image none
  box-sizing border-box
.box >>> .mint-radiolist-label
    text-align right
.box >>> .mint-radiolist-label
    padding 0 0
.box >>> .mint-radio-core
    width 15px
    height 15px
.box >>> .mint-radio-label
    font-size 0.28rem
    color #333
.box >>> .mint-cell-text
    font-size .3rem
    color #333

.box >>> .mint-cell:last-child
  background-image none
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
.box >>> .mint-field.is-textarea
  .mint-field-core
    text-align left
    padding-top 0.1rem
    
.mt20
  margin-bottom 0.2rem
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

.box >>> .weui-cells
  margin-top 0
.box >>> .vux-no-group-title
  margin-top 0  
.desc
  padding 0.2rem 0.25rem
  line-height .4rem
  border-bottom 1px solid #ccc
.title
    padding .6rem .35rem .2rem
    background rgb(247, 246, 246)
    font-size .32rem
    color #000
    position relative
    text-align center
    letter-spacing 1px
    .iconfont
      width value
      position absolute
      left .35rem
      color #666  
    span
      float right
      color #058cff 
      font-size 0.32rem
.box >>> .mint-cell-value
      span
        font-size 0.28rem
        color #ccc
.box >>> .vux-cell-value
    font-size .28rem
    color #ccc
.box >>> .weui-cell_access .weui-cell__ft:after
    height 8px
    width 8px
    border-width 1px 1px 0 0
    border-color #999
    right -2px
.alert
  position fixed
  top 0px
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, .25)
  z-index 99
  display: flex;
  align-items: center;
  justify-content: center;
  .alert-box
    width 70%
    heigth 4rem!important
    background-color white
    display block
    margin auto
    text-align center
    h2
      font-weight bold
      padding .2rem 0
      letter-spacing 1px
    .tip
        padding-bottom .1rem
        letter-spacing 1px
    .sure
      padding .2rem 0
      color #008aff
      letter-spacing 1px
</style>
