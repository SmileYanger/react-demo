<template>
	<div>
		<header-bar :title='title'></header-bar>
		<m-list :listData='informationList' style="padding-top:1.28rem"></m-list>			
	</div>
</template>

<script>
import MList from 'common/list.vue'
import HeaderBar from 'common/headerbar'
export default {

  name: 'InformationList',
  components:{
  	MList,
  	HeaderBar
  },
  created () {
    console.log(11223445566);
    console.log(this.$route.query.keyword);
    this.keywords = this.$route.query.keyword
    
  },
  methods:{
      async getInformationList(){
         const {data:res} = await this.$axios({
              method:'post',
              data:{
                  do:'index_search',
                  weid: this.$store.state.weid,
                  // weid: 2,
                  page: 1,
                  act: 'xinwen',
                  keywords: this.keywords,
                  psize: 10,
                  openid: this.$store.state.openid,
              }
          })
          console.log(res.datas);
          if(res.code !== '200'){
            this.informationList = []
            return
          }
          this.informationList = res.datas
      }
  },
  mounted () {
    this.getInformationList()  
  },
  data () {
    return {
      title:'搜索列表',
      keywords:'',
      informationList:[] //资讯列表
      
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>