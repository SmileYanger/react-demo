<template>
	<div class="recommend" >
          <p class="title border-bottom">
            <span>推介资讯</span>
          </p>
          <ul>
              <li class="border-bottom" v-for="(item,index) in recommendData" @click="goDetails(item.id)" :key="index">
                <img :src="item.thumb|url">
                <div class="right">
                   <p>
                     {{item.title}}
                   </p>
                   <p class="recommend-state">
                       <span class="time">{{item.time}}</span>                      
                       <span>{{item.yuedu}}次浏览</span>
                       <span class="iconfont">&#xeee0;</span>
                   </p>
                 </div>
              </li>             
          </ul>
        </div>
</template>

<script>
export default {

  name: 'recommend',
  props:{
    listId:String
  },

  data () {
    return {
      recommendData:[]
    }
  },
  methods:{
    getrecomendData(){
     var _this=this
      this.$axios({  //详情页推介
        method: 'post',
        data:{
         do:'xinwen_referrer',
         act:'referrer',
         id:this.listId,
         weid:this.$store.state.weid
        },
        }).then(res=>{
            console.log(res.data.datas)
            _this.recommendData=res.data.datas
      })
    },
    goDetails(listId){//推介跳到详情页
      // console.log(ilistIdd)
      // this.$router.push({path:'/hotdetails',query:{listId: id}})
      this.$emit('reloadView', listId)
    },
  },
  mounted(){
    this.getrecomendData()
  }
}
</script>

<style lang="stylus" scoped>
// 推介
.recommend  
   border-bottom .2rem solid #f6f6f6
  .title
    line-height .8rem
    font-size .32rem
    padding 0 .25rem
    box-sizing border-box 
    span
      border-left 3px solid red
      padding-left .2rem
  ul
    padding 0 .25rem
    box-sizing border-box 
    li
      padding .35rem 0
      display flex
      img
        width 2.2rem
        height 1.59rem
        margin-right .2rem
      .right
        flex 1
        position relative
        letter-spacing 1px
        .recommend-state
          position absolute
          bottom 0
          width 100%
          color rgb(178, 178, 178)
          font-size 0.24rem
          padding-top 0.1rem
          display flex
          align-items flex-end
          justify-content space-between
          align-items center
          
          .time
            
          span:nth-child(1)
            width 2rem
            display inline-block
            overflow hidden
            height .35rem
          span:nth-child(1)
            margin-right .2rem
          // span:nth-child(3)
          //   float right
</style>