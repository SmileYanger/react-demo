<template>
	 <div class="container" >
      <tab :line-width=2 active-color='#fc378c' v-model="index" :animate='true'>
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index" @on-item-click="handler" >{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false"   :min-moving-distance='10000'>
        <swiper-item v-for="(item, index) in list2" :key="index" >
          <div class="tab-swiper vux-center" >
							<list :fuList='BusinessList' :fullIndex='tabIndex' :oneFilst='oneFilst'></list>
          </div>		
        </swiper-item>		
      </swiper>
			
    </div>
</template>

<script>
 import List from './list'
 export default {
	name: 'tabSwiper',
	
  components:{
  	List
	},
  data () {
    return {
    	list2:['全部', '最新', '附近'],
    	 demo2: '热门',
			 index:0,
			 BusinessList:[],
			//  存储tab切换index
			 tabIndex:'',
			 oneFilst:[],
			 
    }
	},
	props: ['foo','newHotBus'],
	created(){
		console.log(this.index);
	},
	mounted(){
		console.log(this.index);
	},
	watch: {
		foo(val){
			// 通过组件传值获取到数据 传给最新 最热 最近页面
			this.BusinessList = val	
		},
		newHotBus(val){
			this.oneFilst = val
		}
	},
	methods:{
		handler(index){
			// console.log(index);
			this.tabIndex = index
			// console.log(this.tabIndex);
			this.$emit('HotBusiness',index)
			this.$emit("getIndex",index)
		},
		// hander(index){
		// 	console.log(index)
		// 	this.tabIndex = index
		// 	// console.log(this.tabIndex);
		// 	this.$emit('HotBusiness',index)
		// 	this.$emit("getIndex",index)
		// }
	}
}
</script>

<style lang="stylus" scoped>
	.container >>> .scrollable .vux-tab-item
		
		position relative
	.container >>> .vux-tab-selected
		color rgb(232, 26, 0)!important
		
	.container >>>.vux-tab-ink-bar  
		background-color rgb(232, 26, 0)!important
		width .75rem!important
		margin 3px auto 0
		position absolute
		z-index 99
		bottom 8px !important
	.container >>> .vux-tab-wrap
		padding-top 0.88rem
	.container >>> .vux-tab-container
		height 0.88rem
	.container >>> .vux-slider ,
	.container >>> .vux-slider > .vux-swiper
		overflow visible!important
         
</style>