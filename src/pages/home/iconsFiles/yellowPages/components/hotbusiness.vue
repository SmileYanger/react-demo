<template>
	<div>
		<header-bar :title='title' ></header-bar>
		<m-list :allList='allList' style="padding-top: 1.28rem"></m-list>			
	</div>
</template>

<script>
import MList from './list.vue'
import HeaderBar from 'common/headerbar'
export default {

  name: 'iconList',
  components:{
  	MList,
  	HeaderBar
  },
  created () {
    this.allList = this.$route.query.allHotBus
  },
  data () {
    return {
      title:'热门商家',
      allList:[]
    }
  }
}
</script>

<style lang="css" scoped>
</style>