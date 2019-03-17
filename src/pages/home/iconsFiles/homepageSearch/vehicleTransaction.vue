<template>
	<div>
		<header-bar :title='title'></header-bar>
		<m-list :listDataOne='keywords'></m-list>			
	</div>
</template>

<script>
import MList from '../../../../pages/service/lists/transaction'
import HeaderBar from 'common/headerbar'
export default {

  name: 'VehTransaction',
  components:{
  	MList,
  	HeaderBar
  },
  created () {
     
    this.keywords = this.$route.query.keyword  
  },
  data () {
    return {
      title:'搜索列表',
      keywords:'',
    }
  },
  methods: {
   
  }
}
</script>

<style lang="stylus" scoped>
</style>