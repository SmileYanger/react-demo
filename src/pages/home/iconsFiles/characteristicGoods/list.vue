<template>
	<div class="box">
	    <header-bar :title="title"></header-bar>
	   	<div style="padding-top: 1.28rem">
			<tab :line-width=2 active-color='red' v-model="index" >
				<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index" @on-item-click="handler">{{item}}</tab-item>
			</tab>
			<swiper v-model="index"  :show-dots="false" >
				<swiper-item >
					<ul class="content">
						<router-link tag="li"   :to="{path:'/mydetails2',query:{id:item.id}}" v-for="(item, index)  in itemList" :key='index'>  
							<img :src="item.thumb | url">
							<p>{{item.name}}</p>
							
						</router-link>
						<div class="nodata" v-if="deep">  <!-- 无数据提示 -->
							<div class="nodata-content">
								<img src="../../../../assets/images/sousuo.png" >
								<p>暂无数据...</p>
							</div>
						</div>  
					</ul>
				</swiper-item>
				
			</swiper>
		</div>

		
	</div>
</template>

<script>
import TabSwiper from "common/tabSwiper";
import HeaderBar from "common/headerbar";
export default {
  components: {
    HeaderBar,
    TabSwiper
  },
  data() {
    return {
      title: "特色名品",
      list2: [],
      demo2: "美食",
	  index: 0,
	  tabIndex: 0, //tab栏索引
	  itemList:[], // 列表循环
	  indexList:[],
	  deep:false, // 暂无数据状态
    };
  },
  created() {
	  this.getSpecialName()
  },
  methods: {
    Goback() {
      this.$router.push("/");
    },
    // 切换tab栏获取索引/根据不同的索引 获取不同的数据列表
    async handler(index) {
		this.itemList = []
		for(var i = 0; i < this.indexList.length; i++){
			if(i === this.index){
				const {data:res} = await this.$axios({
					method: 'post',
					data:{
						do : 'merchant',
						act : 'whly_q',
						weid : this.$store.state.weid,
						blei: this.indexList[i]
					}
				})
				console.log(res);
				if(res.code !== "200"){
					this.deep = true
					return
				}
				this.deep = false
				this.itemList = res.datas
			}
		}
     
	},
	// 特色名品导航
	async getSpecialName(){
		const {data:res} = await this.$axios({
			method: 'post',
			data:{
				do : 'merchant',
				act : 'whly',
				weid : this.$store.state.weid
			}
		})
		console.log(res)
		if(res.code !== '200') return console.log(res.msg)
		res.datas.forEach((element,i)=>{
			this.list2.push(element.name)
			this.indexList.push(element.id)
			if(i === this.index){
				// 页面加载，  加载第一个tab的数据
				this.handler(i)
			}
		})
	}

  }
};
</script>

<style lang="stylus" scoped>
.box >>> .scrollable .vux-tab-item {
	position: relative;
}

.box >>> .vux-tab-selected {
	color: rgb(232, 26, 0) !important;
}

.box >>>.vux-tab-ink-bar {
	background-color: rgb(232, 26, 0) !important;
	width: 0.5rem !important;
	margin: 3px auto 0;
	position: absolute;
	z-index: 99;
	bottom: 0.1rem !important;
}

.box >>> .vux-slider, .box >>> .vux-slider > .vux-swiper {
	overflow: visible !important;
}

.box >>> .vux-tab-item {
	background-image: none !important;
	color: rgb(133, 133, 133) !important;
}

.box >>> .vux-swiper {
	height: 100% important;
	background-color: #f6f6f6;
	flex: none;
	display: block;
	flex: 1;
	width: 100%;
	height: 100%;
}

.box {
	// 
	.content {
		height: 8rem;
		background-color: white;
		padding: 0.35rem 0.25rem;
		box-sizing: border-box;
		margin-top: 0.1rem;

		li {
			float: left;
			width: 3.38rem;
			height: auto;
			margin-bottom: 0.25rem;
			letter-spacing: 1px;

			img {
				width: 100%;
				height: 2.1rem;
			}

			p {
				font-size: 0.28rem;
				color: #000;
				padding: 0.15rem 0 0;
			}

			span {
				font-size: 0.22rem;
				color: rgb(133, 133, 133);
			}
		}

		li:nth-child(2n) {
			float: right;
		}
	}
}
.nodata
	position fixed
	background-color white
	z-index 9999
	top 5.3rem
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