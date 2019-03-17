<template>
	<div>
		<header-bar :title='title'></header-bar>
		<m-swiper :foo='listner' @getIndex="getIndex" style="padding-top: 1.28rem"></m-swiper>			
	</div>
</template>

<script>
import MSwiper from './tabswiper.vue'
import HeaderBar from 'common/headerbar'
export default {
  name: 'iconList',
  components:{
  	MSwiper,
    HeaderBar,
  },
  created () {
    this.id = this.$route.query.id
    this.title = this.$route.query.name
    this.getIndex()   
  },
  data () {
    return {
      title:'',
      id:'',  //分页id
      listner:[],
      isType: '', // 商铺的最新最热
      iconlat:'',
      iconlng:'',
    }
  },
  methods:{
    // 根据id获取商家
    async getBusinessList(){
      const {data:res} = await this.$axios({
        method: "post",
        data:{
          do : 'merchant',
          act: 'list',
          weid: this.$store.state.weid,
          page:1,
          blei:this.id,
          type: this.isType,
          lng:this.iconlng,
          lat:this.iconlat
        }
      })
      if(res.code !== '200') return  this.listner =[]   
      this.listner = res.datas
      // console.log(res.datas);
    },
    //tab切换 获取到最新最热 isType
    getIndex(index){
      console.log(index);
      if(index=== undefined || index == 0) {
        this.iconlat = ''
        this.iconlng = ''
        this.isType = ''
        this.getBusinessList()  
      }else if(index === 1) {
        this.iconlat = ''
        this.iconlng = ''
        this.isType = 'hot'
        this.getBusinessList()  
      }else if(index === 2){
        let op  =  localStorage.getItem('op')
        let array = op.split(',')
        for(var i = 0; i < array.length; i++){
          this.iconlat = array[0]
          this.iconlng = array[1]
        }
        console.log( this.iconlat);
        console.log( this.iconlng);
        this.isType = 'nearby'
        this.getBusinessList()  
      }
      // console.log(this.isType);
    }
  },
  mounted() {
   
  },
}
</script>

<style lang="css" scoped>
</style>