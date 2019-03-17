<template>
	<div class="list" ref="wrapper">
		<div>
			<div class="area" v-show="showList">
				<div class="title">{{newCity}}</div>
				<div class="btn-list">
					<div class="btn" v-for="(item) in allCity" :key="item.id" @click='choiCecity(item.name,item.id)'>{{item.name}}</div>
					
				</div>
			</div>
			<div class="area">
				<div class="title" >定位/当前区县</div>
				<div class="btn-list" >
					<div class="btn currentCity iconfont" @click="mapClick"> {{newCounty === ''? '定位中...': newCounty}}</div>
					<div @click.stop=selectCounty>选择区县</div>
				</div>

				
			</div>
			
			<div class="area">
				<div class="title" >最近访问</div>
				<div class="btn-list" >
					<div class="btn" v-for="item in hotCity" :key="item.id" @click="handleCity(item.city)">{{item.city}}</div>
				</div>
			</div>
			<div class="area" v-for="(item, key) in cities"  :key="key" :ref="key">
				<div class="currentAlphabet border-topbottom" >{{key}}</div>
					<div class="item-list">
						<div 
							class="item border-bottom" 
							v-for="innerItem in item" 
							:key="innerItem.id" 
							@click="handleCity(innerItem.city,innerItem.code)"
							:data-city="innerItem.city"
							:data-code='innerItem.code'
						>
							{{innerItem.city}}
						</div>					
				   </div>
			 </div>
		 </div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'		
	export default{
		name:'CityList',		
		props:{
			hotCity:Array,    
			cities:Object,
			newCounty: String,
			// newCityId: String			
		},		
		data(){
			return{
				letter:'',
				area:'', //区县
				mapLatLong:'', //获取当前省
				provinceId:'', //获取省id
				cityId:[],//区县id
				allCity:[],  //区县
				newCity:'', //当前市
				showList: false, 				
			}
		},
		created () {			
			// this.area = localStorage.getItem('area')
			this.newCity =  localStorage.getItem("bus")
			this.mapLatLong = localStorage.getItem('province')
			this.getProvince() //获取省
			this.getCity()  //获取市
			this.bus.$on('aa',(res)=>{
				if(res){
					this.showList = true
				}
				this.allCity = res
			})
		},
		methods:{
			// 选择区县
			selectCounty(){
				this.showList = !this.showList
				this.allCity = JSON.parse(localStorage.getItem("cityId"))
				console.log(this.allCity)
				this.newCity = localStorage.getItem("bus")
				
			},
						// 根据传搜索传过来的code 来请求县区
			async getCityCode(cityWeid){
				const {data:res} = await this.$axios({
					method:'post',
					data:{
						do:'common',
						act:'countys',
						cityid:cityWeid
					}
				})
				
				this.bus.$emit('aa',res)
				
			},
			handleCity(city,weid){
				// console.log('测试');
				this.showList = true
				// console.log(city,weid);
				this.$store.dispatch('changeCity',city)
				// this.$router.push("/")
				// this.$store.commit ('changeWeid',weid)
				//当前市
				this.newCity = city

				this.getCityCode(weid)

				this.scroll.scrollTo(0, 0)
				
			},
			async mapClick(){		
				this.$router.push({ path: '/'})
			},
			// 获取省
			async getProvince(){
				const {data:res} = await this.$axios({
					method:'post',
					data:{
						do:'common',
						act:'province'
					}
				})
				// console.log(res);
				res.forEach(async element => {
					if(element.name === this.mapLatLong){
						
						const {data:res} = await this.$axios({
							method:'post',
							data:{
								do:'common',
								act:'city',
								provinceid: element.id
							}
						})
						// console.log(res);
						// console.log(11111);
						res.forEach(async ele => {
							// console.log(ele);
							// console.log(11111);
							if(ele.name === localStorage.getItem('bus')){
								console.log(ele.id);
								console.log(ele.name);
							 	const {data:res} = await this.$axios({
									method:'post',
									data:{
										do:'common',
										act:'countys',
										cityid:ele.id
									}
								})
								console.log(res);
								console.log(11111);
								localStorage.setItem("cityId",JSON.stringify(res))



								// const {data:res} = await this.$axios({
								// 	url:'https://apis.map.qq.com/ws/district/v1/getchildren?id=610100&key=UENBZ-EHU3W-ZKER5-OJDLD-AYLUJ-75FFH',
								// 	method:'get',
								// 	istype:1,
								// })
							}
						});
					}
				});
			},
			// 获取市
			async getCity(){
				const data = await this.$axios({
					method:'post',
					data:{
						do:'common',
						act:'city',
						provinceid: this.provinceId
					}
				})
				// console.log(data);
			},
			choiCecity(name,id){
				this.area = name
				this.$store.commit ('changeCity',name)
				// console.log(id);
				// console.log(112255);
				// this.$router.push("/")
				this.$router.push({ path: '/', query: { userWeid: id }})
				
				// this.getAcquiringCounty(id)

				
				
			},
			
			// 获取县域id
			async getAcquiringCounty(cityId){
				const {data:res} = await this.$axios({
					method:'post',
					data:{
					do:'common',
					districtid:cityId,
					sign:'87126dee0e09e612981c63ece01a8715'
					}
				})
				
				if(res.code !== '200') return console.log('获取数据失败');
				// 获取到县域id  传到vuex中 
				let id  = res.datas.id
				this.$store.commit ('changeWeid',id)
			}
			
			
		},
		

		mounted:function(){
			this.scroll=new  BScroll(this.$refs.wrapper,{click:true})
			var _this=this
			this.bus.$on('',function(value){
				_this.letter=value
			})	
			
			// 获取搜索的市县
			this.bus.$on("cityone", (res)=>{
				// console.log(123456789123);
				// console.log(res);
				this.newCity = res

			})

			
		},
		watch:{		
			letter() {
				const element=this.$refs[this.letter][0]
				this.scroll.scrollToElement(element)
			},
			//  //县
			// newCounty(val){
			// 	console.log(123123123123);
			// 	console.log(val);
			// },
			// //市
			// newCity(val){
			// 	console.log(232323232323);
			// 	console.log(val);
			// }
		}
	}
</script>

<style lang="stylus" scoped="scoped">
 @import '~styles/varibles.styl'
.list
	overflow:hidden
	position:absolute
	top:1.28rem
	left:0
	right:0
	bottom:0
	background-color #f6f6f6
 .title
 	font-size:0.24rem
 	padding:0.20rem .25rem
 	color #666
 	letter-spacing 1px
 
 .btn-list
 	padding:0 .83rem 0 .25rem
 	box-sizing:border-box
 	display:flex
 	flex-wrap:wrap
 	justify-content: space-between
 	align-items:center
 .btn
 	line-height .8rem
 	width:31%	
 	background-color white
 	text-align:center
 	border-radius:.06rem
 	margin-bottom .2rem
 	font-size .28rem
 	color #333
 .currentCity
 	background-color #008aff
 	color white
 .currentAlphabet
 	padding-left .25rem
 	padding-right .83rem
 	box-sizing:border-box
 	line-height .54rem
 	font-size .28rem
 	color #333
 .item-list
 	background-color white
 	.item
 		line-height:.86rem
 		padding-left:.25rem
 		color:#333	
 		font-size .32rem
</style>