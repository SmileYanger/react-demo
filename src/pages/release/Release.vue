<template>
  <div class="main" v-show="modelStatus">
	  <div class="title">
     发布类别 
    </div>
    <ul class="icon-list">
      <li v-for="(item,index) in iconList"  :key="index" @click="handelClick(index)">
        <img :src="item.imgUrl">
        <span>{{item.desc}}</span>
      </li>
    </ul>
    <div class="bottom-box">
      <i class="iconfont close" @click="closeModel">&#xe61c;</i>
      <span>发布规则及免责声明</span>
    </div>
	</div>
</template>

<script>
import Tabbar from 'common/Tabbar'
import Vue from 'vue'
Vue.prototype.bus=new Vue()
export default {

  name: 'Release',
components: {
  	Tabbar
  },
  data () {
    return {
      modelStatus:false,
      iconList:[
        {
          imgUrl:require("../../assets/images/relese/p1.png"),
          desc:'房屋出售'
        },
         {
          imgUrl:require("../../assets/images/relese/p2.png"),
          desc:'房屋出租'
        },
         {
          imgUrl:require("../../assets/images/relese/p3.png"),
          desc:'企业招聘'
        },
         {
          imgUrl:require("../../assets/images/relese/p4.png"),
          desc:'个人求职'
        },
         {
          imgUrl:require("../../assets/images/relese/p5.png"),
          desc:'车辆交易'
        },
         {
         imgUrl:require("../../assets/images/relese/p6.png"),
          desc:'二手物品'
        },
         {
         imgUrl:require("../../assets/images/relese/p7.png"),
          desc:'拼车中心'
        }
      ],
      refs:[
          '/housesale',  
          '/houserentals',
          '/company',
          '/jobhunting',
          '/vehicletransaction',
          '/secondhandgoods',
          '/carpoolcenter'
      ]     
    }
  },
  methods:{
    closeModel(){
        this.bus.$emit('',false)
    },
    handelClick(index){
        this.$router.push(this.refs[index])
      }
  }
}
</script>

<style lang="stylus" scoped>
  .main
     width 100%
     height 100%
     position fixed
     background rgba(255, 255,255, .9)
     z-index 9999
     top 0px
     left 0
    .title
      text-align center
      font-size 0.32rem
      color #000
      padding-top 0.6rem
      padding-bottom 1rem
      letter-spacing 1px
  .icon-list
    padding 0 .3rem
    width 100%
    height auto
    background orange
    box-sizing border-box
    background-color white
  .icon-list li
      width 25%
      height 1.47rem
      // margin-right 0.78rem
      float left
      padding-bottom .8rem
      text-align center
  .icon-list li:nth-child(4)
    margin-right 0
  .icon-list li img
      width 0.99rem
      height 0.99rem
  .icon-list li span
      font-size 0.24rem
      color rgb(51, 51, 51)
      padding-top .25rem
      display block
      text-align center
  .bottom-box
    position absolute
    bottom .5rem
    margin auto
    left 0
    right 0
    text-align center
  .close
    font-size .6rem
  .bottom-box span
    display block
    padding-top .7rem
    color rgb(210, 210, 210) 
    text-decoration underline
</style>