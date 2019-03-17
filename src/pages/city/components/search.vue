<template>
	<div>
		<div class="search border-bottom">
	        <i class="iconfont" @click="Goback">&#xe671;</i>
	        <div class="search-bar"> 
	            <i  class="iconfont ">&#xe6c6;</i>
	            <input type="search" placeholder="请输入县域名、首字母名查询" v-model="keyword" >
	        </div>
	    </div>
		<div ref="search" class="search-box" v-show="keyword">
			<ul >
				<li 
					v-for="item in list"
				    class="list-item border-bottom"
				     :key="item.id"
				     @click="handelCity(item)"
				>{{item.city ? item.city : item.countyname}}</li>
				<li v-show="hasNoData" class="list-item border-bottom center">没有找到匹配的数据</li>
			</ul>
		</div>		
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:'CitySearch',
		// props:{
		// 	cities:Object,
		// 	countyObjs:Aarray
		// },
		props:['cities','countyObjs'],
		data(){
			return{
				keyword:'',
				list:[],
				timer:'',
				show:true,
			
			}
		},
		created() {
			
			
		},
		methods:{
			handelCity(item){
				console.log(123456);
				console.log(item)
				let city;
				let citycode;
				if(item.city){
					city = item.city
				}else {
					city = item.countyname
				}
				
				this.bus.$emit('cityone',city)

				if(!item.citycode){
					citycode = item.code
				}else {
					citycode = item.citycode
				}

				
				this.getCityCode(citycode,city)

				this.keyword = ''
				
			},
			 Goback(){
		      this.$router.go(-1)
			},
						// 根据传搜索传过来的code 来请求县区
			async getCityCode(citycode,city){
				const {data:res} = await this.$axios({
					method:'post',
					data:{
						do:'common',
						act:'countys',
						cityid:citycode
					}
				})
			
				this.bus.$emit('aa',res)
				
			}
		},
		watch: {
			keyword () {
				if(this.timer){
					clearTimeout(this.timer)
				}
				if(!this.keyword){
					this.list=[]
					return
				}
				
				this.timer = setTimeout( () => {
					const result=[]
					for(let i in this.cities){
						
						this.cities[i].forEach((value)=> {
							
							if(value.short.indexOf(this.keyword)>-1 || value.city.indexOf(this.keyword)>-1){
								
								result.push(value)
							}
						})
					}

					this.countyObjs.forEach(value => {
						
						if(value.short.indexOf(this.keyword)  > -1 || value.countyname.indexOf(this.keyword) >-1){
								
								result.push(value)
							}
							
					});
					this.list=result
					
				},100)
				// console.log(this.list)
				
			}
		},     
		mounted(){
			this.scroll= new BScroll(this.$refs.search)
			// console.log(this.cities);

		

			
		},
		computed:{
			hasNoData(){
				return !this.list.length
			}
		}
	}
</script>

<style lang="stylus" scoped="scoped">

 @import '~styles/varibles.styl'
 .search
      padding 0 .25rem
      font-size .32rem
      color #000
      position relative
      text-align center
      letterSpaceing()
      height 1.28rem
      display flex
      background-color #f6f6f6   
      width 100%  
      box-sizing border-box 
      position fixed
      z-index 99
      align-items center
      .iconfont
        line-height .6rem
      .search-bar
        height .6rem
        background green
        float right
        flex 1
        margin-left .2rem
        border-radius .3rem
        background white
        font-size 0
        .iconfont
          line-height .6rem 
        input
          height .6rem
          font-size .13rem
          letterSpaceing()
          padding-left .1rem
          width 86%
          outline none   
          vertical-align top 
.search-box
	position: absolute
	z-index:1
	overflow:hidden
	top:1.28rem
	left:0
	right:0
	bottom:0
	background:#ccc
.list-item
	line-height:.8rem
	font-size:.3rem
	padding:0 .2rem
	background:#fff
.center
	text-align:center
</style>