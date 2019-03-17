<template>
	<div>
		<header-bar :title='title'></header-bar>
		<m-list :listDataOne='keywords' ></m-list>			
	</div>
</template>

<script>
import MList from '../../../../pages/service/lists/houseRent'
import HeaderBar from 'common/headerbar'
export default {

  name: 'HouseRens',
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
  },
  methods: {
   
  }
}
</script>

<style lang="stylus" scoped>
</style>