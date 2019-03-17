<template>
	<div>
		<header-bar :title='title'></header-bar>
		<m-list :listData='actList' style="padding-top:1.28rem"></m-list>			
	</div>
</template>

<script>
import MList from './components/actList'
import HeaderBar from 'common/headerbar'
export default {

  name: 'ActivityList',
  components:{
  	MList,
  	HeaderBar
  },
  created () {
    
    this.keywords = this.$route.query.keyword
    
  },
  methods:{
      async getactivityList(){
         const {data:res} = await this.$axios({
              method:'post',
              data:{
                  do:'index_search',
                  // weid: this.$store.state.weid,
                  weid:2,
                  page: 1,
                  act: 'huodong',
                  keywords: this.keywords,
                  psize: 10,
              }
          })
          console.log(123456)
          console.log(res);
          if(res.code !== '200'){
            this.actList = []
            return
          }
          this.actList  = res.datas
      }
  },
  mounted () {
    this.getactivityList()  
  },
  data () {
    return {
      title:'活动列表',
      keywords:'',
      actList:[] //活动列表
      
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>