<template>
	<div>
		<header-bar :title='title'></header-bar>
		<m-list :listData='keywords' style="padding-top:1.28rem"></m-list>			
	</div>
</template>

<script>
import MList from '../../../../pages/service/lists/recruitment'
import HeaderBar from 'common/headerbar'
export default {

  name: 'EnterRecruitment',
  components:{
  	MList,
  	HeaderBar
  },
  created () {
    console.log(11223445566);
    console.log(this.$route.query.keyword);
    this.keywords = this.$route.query.keyword
    
  },
 
  data () {
    return {
      title:'搜索列表',
      keywords:'',
      
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>