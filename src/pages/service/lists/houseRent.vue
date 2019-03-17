<template>
  <div style="padding-top:1.28rem">
    <div v-for="(item, index) in lists" :key="index">
      <list :data="item"></list>
    </div>
    <div class="nodata" v-if="houseRentDeep">  <!-- 无数据提示 -->
			<div class="nodata-content">
				<img src="../../../assets/images/sousuo.png" >
				<p>暂无数据</p>
			</div>
		</div> 
  </div>

</template>

<script>
  import List from '../components/houseRentItem'

  export default {
    name: "",
    components: {
      List
    },
    data() {
      return {
        lists: [],
        houseRentDeep:false
      }
    },
    props: ['listDataOne'], //首页搜索
    created() {
     
      if(!this.listDataOne){
        this.getHouseRentInfo()
      }else {
         this.getHouseRent()
      }
    },
    methods: {
      getHouseRentInfo() {
        this.$axios({
          method: 'post',
          data: {
            do: 'xinxi',
            districtid: this.$store.state.weid,
            type: '2',
            page: '1',
            psize: '10'
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.lists = res.data.datas
          }
        }).catch(err => {

        })
      },
      // 首页搜索房屋出租
      async getHouseRent(){
        const {data:res} = await this.$axios({
          method: 'post',
          data:{
            do:'index_search',
            districtid:this.$store.state.weid,
            // districtid:2,
            act:'zufang',
            keywords:this.listDataOne,
            page:1,
            psize:10,
          }
        })
        console.log(res);
        if(res.code !== '200'){
          this.houseRentDeep = true
          return
        }
          this.lists = res.datas
      }
      
    }
  }
</script>

<style lang="stylus" scoped>
.nodata
	position fixed
	background-color white
	z-index 9999
	top 1.3rem
	right 0
	bottom 0
	left 0
	margin auto
	heigth 100%
	display flex
	justify-content space-between
	align-items center
	flex-direction column 
	.nodata-content
		position: absolute
		top:50%
		left: 50%
		transform: translate(-50%,-50%)
		text-align: center
		img 
		width: 3rem
	p
		padding-top .5rem
		color #666
		font-size .26rem
		letter-spacing 1px
</style>
