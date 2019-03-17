<template>
<div class="box">
    <header-bar :title="title"></header-bar>
    <tab-swiper :menuList="menuList" :fenleiId='id' class='top65'></tab-swiper>
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
  name:'list1',
  data () {
    return {
       title:'聚焦尉氏',
       hotdetails:'/hotdetails',
       menuList:[],
       id:this.$route.query.id
    }
  },
  mounted () {
      var _this=this
      if(this.id==19){ //惠民共享导航
          this.title='惠民共享'
          this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_head',
            districtid:this.$store.state.weid,
            type:'hmzc'
          },
          }).then(res=>{
              console.log(res.data.datas)
              _this.menuList=res.data.datas
        })         
      }
      if(this.id==20){ //聚焦尉氏导航
          this.title='聚焦尉氏'
          this.$axios({  
          method: 'post',
          data:{
            do:'xinwen_head',
            districtid:this.$store.state.weid
          },
          }).then(res=>{
              console.log(res.data.datas)
              _this.menuList=res.data.datas
        })
      }
  },
}
</script>

<style lang="stylus" scoped>
 .top65
  padding-top 1.28rem
      
</style>