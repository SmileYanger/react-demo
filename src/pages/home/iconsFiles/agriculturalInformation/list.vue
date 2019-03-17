<template>
<div class="box">
    <header-bar :title="title"></header-bar>
    <tab-swiper :menuList="menuList"></tab-swiper>
</div>
</template>

<script>
import TabSwiper from 'common/tabSwiper'
import HeaderBar from 'common/headerbar'

export default {
  components:{
    HeaderBar,
    TabSwiper
  },
  name:'list2',
  data () {
    return {
       title:'惠民共享',
       hotdetails:'/hotdetails',
       menuList:[],
       id:this.$route.query.id
    }
  },
  methods:{
    Goback(){
      // this.$router.push('/')
      console.log(this.id)
    },
    getHomeInfo () {
        var _this=this
        this.$axios({  //首页列表页
        method: 'post',
        data:{
         do:'xinwen_head',
         districtid:this.$store.state.weid,
         type:'hmzc'
        },
        }).then(res=>{
            console.log(res.data.datas)
            _this.menuList=res.data.datas
          // _this.menuList=menu.unshift({name:'全部'})
      })
    }
  },
  created () {
      this.getHomeInfo() 
  },
}
</script>

<style lang="stylus" scoped>
 
      
</style>