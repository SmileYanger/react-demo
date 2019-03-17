<template>
	<div class="box">
	  <div class="top">
      <i class="iconfont" @click="Goback">&#xe671;</i>
      <div class="search-bar"> 
          <i  class="iconfont ">&#xe6c6;</i>
          <input type="search" placeholder="请输入你要搜索的关键词" v-model="keywords" @input="getValue()" ref="keywords">
      </div>
      <span class="btn" @click='goSearch'>{{btn}}</span>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
       <div class="title">
          历史搜索
          <i class="iconfont" @click="deleteHistory">&#xe625;</i>
       </div>
       <ul>
         <li v-for="(item,index) in searchList" :key="index" @click='historySearch(item)'>
          {{item}}
         </li>
       </ul>
    </div>
  </div>
</template>

<script>
export default {

  name: 'activityList',
  data () {
    return {
      keywords:'',
      btn:'取消',
      historyList:[],
      item:[],
      searchList:[]
    }
  },
   methods:{
    Goback(){
      this.$router.go(-1)
    },
    search(key){
      console.log(key)
      this.$router.push({path:'/publist',query:{keywords:key}})
      /*var _this=this
          this.$axios({  
            method: 'post',
            data:{
             do:'gzh_search',
             act:'gzh',   
             weid:2,
             page:1,
             psize:3,
             keywords:key
            },
          }).then(res=>{
            console.log(res)
            console.log(key)
            this.$router.push({path:'/publist',query:{list:res.data.datas}})
            this.keywords = ""
        })*/
    },
    historySearch(key){  //历史搜索
      this.search(key)
    },
    goSearch(){  //输入关键词搜索
      this.historyList = localStorage.getItem('key');
      var key=this.keywords
      if(this.keywords==''){
        alert("请输入关键词")
      }else{
        if(this.historyList){
          //查詢追加
          var newarr=JSON.parse(this.historyList);
          newarr.push(this.keywords)
          var itemjson= JSON.stringify(newarr)
          localStorage.setItem('key', itemjson)
        }else{
          //新增
          var newarr=[]
          newarr.push(this.keywords)
          var itemjson= JSON.stringify(newarr)
          localStorage.setItem('key', itemjson)
        }
        this.search(key)
      }       
    },
    getValue(){
        this.btn="搜索"            
    },
    deleteHistory(){
      this.searchList=[]
    }  
  },  
  mounted(){    
    var historyjson=localStorage.getItem('key')
    this.item=JSON.parse(historyjson);
    this.searchList =(Array.from(new Set(this.item))).reverse().slice(0, 10);
  }
}
</script>

<style lang="stylus" scoped>
.box
   
    .top
      padding .48rem .35rem .2rem
      font-size .32rem
      color #000
      position relative
      text-align center
      letterSpaceing()
      height .6rem
      display flex 
      background #f6f6f6      
      .iconfont
        line-height .6rem
      .search-bar
        height .6rem
        background green
        float right
        flex 1
        margin-left .2rem
        border-radius .3rem
        background white
        font-size 0
        .iconfont
          line-height .6rem 
        input
          height .6rem
          font-size .13rem
          letterSpaceing()
          padding-left .1rem
          width 86%
          outline none   
          vertical-align top
          &::-webkit-input-placeholder 
            color rgb(153,153,153)
            font-size .26rem
          &:-moz-placeholder 
            color rgb(153,153,153)
            font-size .26rem
          &::-moz-placeholder 
            color rgb(153,153,153)
            font-size .26rem
          &:-ms-input-placeholder  
            color rgb(153,153,153)
            font-size .26rem 
      .btn
        line-height .6rem
        padding-left .2rem
        font-size .26rem
        color rgb(102, 102, 102)   
    .history
      padding .2rem .25rem 
      .title
        letterSpaceing()
        box-sizing border-box
        display flex
        justify-content space-between
        line-height .6rem
        font-size .26rem
        color rgb(153,153,153)
        .iconfont
          font-size .4rem
      ul
        display flex
        flex-wrap wrap
        margin-top .1rem
        // justify-content space-between
        li
          padding 0  0.3rem
          margin-right .2rem
          line-height .65rem
          background-color #f6f6f6
          border-radius .04rem
          margin-bottom .2rem
</style>