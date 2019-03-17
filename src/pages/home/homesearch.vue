<template>
	<div>
		<div class="search border-bottom">	        
	        <div class="search-bar"> 
	            <span  class="search-left" @click='showModel'>
	            	{{current}}
	            	<i class="iconfont">&#xe684;</i>
	            </span>
	            <div class="input-search">
	            	<input type="search" placeholder="请输入你要输入的关键字" v-model="keyword" @click="goSearch">
	            </div>
	        </div>
	        <div class="concel" @click="Goback">{{keyword === ''? btn = '取消' : btn = '搜索'}}</div>
	    </div>
	    <div class="list-box">
	    	<h2>历史搜索</h2>
	    	<ul>
	    		<li class="border-bottom" v-for="(item,index) in historList" :key='index' @click="fuClick(item)">
	    			{{item}}
	    			<i class="iconfont" @click.stop='remo(index,item)'> &#xe61c;</i>
	    		</li>
	    		
	    		
	    	</ul>
			<div class="delete" @click="toRemove(item)">
					<i class="iconfont"> &#xe625;</i>
					清除历史搜索
	    	</div>
	    	
	    </div>
	    <div class="float" v-show="modelState">
	    	<ul class="model">
	    		<li v-for="(item,index) in list" :key="index" @click='handelItem(item)'>
	    			{{item}}
	    		</li>	    		
	    	</ul>
	    </div>
	    <!-- <div class="float list" v-show="modelList">
	    	<ul class="model">
	    		<li v-for="(item,index) in searchList" :key="index" class="border-bottom">
	    			<span>{{keyword}}</span>{{item}}
	    		</li>	    		
	    	</ul>
	    </div> -->
	</div>
</template>

<script>
export default {

  name: 'hoemsearch',

  data () {
    return {
    	keyword:'',
    	modelState:false,
    	current:'资讯',
    	list:['资讯','活动','商家','便民电话','房屋出售','房屋出租','企业招聘','个人求职','车辆交易','二手物品','拼车中心'],
    	searchList:['房价','暴雨','女子被狗咬','旅游攻略'],
		// modelList:false,
		btn:'',
		historList:[], //历史记录
		
		information:[], //资讯
		activity:[], //活动
		business:[],//商家
		civTelephone:[], //便民电话
		houSale:[], // 房屋出售
		houRent:[], //房屋出租
		enterRec:[], //企业招聘
		persJob:[], //个人求职
		vehicleTran:[], //车辆交易
		secondGoods:[], //二手物品
		carpoCer:[], //拼车中心
    }
  },
  created() {
	  let hisd = JSON.parse(localStorage.getItem('HisRecords'))
	  console.log(hisd)
	  //   刷新页面后判断缓存中是否有数据
		if(hisd === null){
			this.historList =[]
			return
		}else {
			this.information = hisd
		}

	  this.historList = hisd


  },
  watch: {
	//   活动页历史记录
	  information(val){
		  console.log(112233445566);
		  console.log(val);
		  if(val.length > 6){
			  val.pop()
		  }
		  let vall = this.dedupe(val)
		  this.historList = vall
		  localStorage.setItem('HisRecords',JSON.stringify(vall))
	  },
	
	   activity(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			
			this.historList = vall
			localStorage.setItem('Activity',JSON.stringify(vall))
	   },
		business(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('Business',JSON.stringify(vall))
		},
		civTelephone(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('CivTelephone',JSON.stringify(vall))
		},
		houSale(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('HouSale',JSON.stringify(vall))
		},
		houRent(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('HouRent',JSON.stringify(vall))
		},
		enterRec(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('EnterRec',JSON.stringify(vall))
		},
		persJob(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('PersJob',JSON.stringify(vall))
		},
		vehicleTran(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('VehicleTran',JSON.stringify(vall))
		},
		secondGoods(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('SecondGoods',JSON.stringify(vall))
		},
		carpoCer(val){
			if(val.length > 6){
				val.pop()
			}
			let vall = this.dedupe(val)
			this.historList = vall
			localStorage.setItem('CarpoCer',JSON.stringify(vall))
		},



	  historList(val){
		  
		  this.historList = val
	  }
  },
  methods:{
	  toRemove(){
		 
		  if(this.current === '资讯'){
			  this.historList = []
			  localStorage.removeItem("HisRecords")
		  }else if(this.current === '活动'){
			  this.historList = []
			  localStorage.removeItem("Activity")
		  }else if(this.current === '商家'){
			  this.historList = []
			  localStorage.removeItem("Business")
		  }else if(this.current === '便民电话'){
			  this.historList = []
			  localStorage.removeItem("CivTelephone")
		  }else if(this.current === '房屋出售'){
			  this.historList = []
			  localStorage.removeItem("HouSale")
		  }else if(this.current === '房屋出租'){
			  this.historList = []
			  localStorage.removeItem("HouRent")
		  }else if(this.current === '企业招聘'){
			  this.historList = []
			  localStorage.removeItem("EnterRec")
		  }else if(this.current === '个人求职'){
			  this.historList = []
			  localStorage.removeItem("PersJob")
		  }else if(this.current === '车辆交易'){
			  this.historList = []
			  localStorage.removeItem("VehicleTran")
		  }else if(this.current === '二手物品'){
			  this.historList = []
			  localStorage.removeItem("SecondGoods")
		  }else if(this.current === '拼车中心'){
			  this.historList = []
			  localStorage.removeItem("CarpoCer")
		  }
	  },
	//  根据历史记录搜索？
	fuClick(val){
		this.btn = '搜索'
		this.keyword = val
		this.Goback()
	},
	  remo(index,item){
		  if(this.current === '资讯'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('HisRecords'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('HisRecords',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else

		  if(this.current === '活动'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('Activity'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('Activity',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else 
		  if(this.current === '商家'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('Business'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('Business',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '便民电话'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('CivTelephone'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('CivTelephone',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '房屋出售'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('HouSale'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('HouSale',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '房屋出租'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('HouRent'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('HouRent',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '企业招聘'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('EnterRec'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('EnterRec',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '个人求职'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('PersJob'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('PersJob',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '车辆交易'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('VehicleTran'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('VehicleTran',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '二手物品'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('SecondGoods'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('SecondGoods',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }else  if(this.current === '拼车中心'){
			  console.log(item)
			  let hisRec = JSON.parse(localStorage.getItem('CarpoCer'))
			  console.log(hisRec);
			  let newArr = []
			  hisRec.forEach(element => {
				  if(element !== item){
					  newArr.push(element)
				  }
			  })	 
			  localStorage.setItem('CarpoCer',JSON.stringify(newArr))
			  this.historList.splice(index,1)
		  }


	  },
	//   数组去重
	dedupe(array){
		return Array.from(new Set(array));
	},
  	Goback(){
		  if(this.btn === '取消'){
			  this.$router.go(-1)  
		  }else {
			  
			  switch(this.current){
				case   '资讯':
					// 历史记录
					
					if(!localStorage.getItem('HisRecords')){
						this.information = []
					}else {
						this.information = JSON.parse(localStorage.getItem('HisRecords'))
					}
					
					this.information.unshift(this.keyword.trim());		
					this.$router.push({path:'informationList',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case   '活动':
					// 历史记录
					if(!localStorage.getItem('Activity')){
						this.activity = []
					}else {
						this.activity = JSON.parse(localStorage.getItem('Activity'))
					}

					this.activity.unshift(this.keyword.trim());								
					this.$router.push({path:'activityList',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case    '商家':


					if(!localStorage.getItem('Business')){
						this.business = []
					}else {
						this.business = JSON.parse(localStorage.getItem('Business'))
					}
					this.business.unshift(this.keyword.trim());
					this.$router.push({path:'businessList',query: { keyword: this.keyword,acter:'shop',weid:'weid'}});
					this.keyword = '';
					break;
				case	'便民电话':

					if(!localStorage.getItem('CivTelephone')){
						this.civTelephone = []
					}else {
						this.civTelephone = JSON.parse(localStorage.getItem('CivTelephone'))
					}
					this.civTelephone.unshift(this.keyword.trim());
					this.$router.push({path:'searchlist',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'房屋出售':
					if(!localStorage.getItem('HouSale')){
							this.houSale = []
						}else {
							this.houSale = JSON.parse(localStorage.getItem('HouSale'))
					}
					this.houSale.unshift(this.keyword.trim());
					this.$router.push({path:'housesSale',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'房屋出租':
					if(!localStorage.getItem('HouRent')){
							this.houRent = []
						}else {
							this.houRent = JSON.parse(localStorage.getItem('HouRent'))
					}
					this.houRent.unshift(this.keyword.trim());
					this.$router.push({path:'houseRens',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'企业招聘':
					if(!localStorage.getItem('EnterRec')){
							this.enterRec = []
						}else {
							this.enterRec = JSON.parse(localStorage.getItem('EnterRec'))
					}
					this.enterRec.unshift(this.keyword.trim());
					this.$router.push({path:'enterRecruitment',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'个人求职':
					if(!localStorage.getItem('PersJob')){
							this.persJob = []
						}else {
							this.persJob = JSON.parse(localStorage.getItem('PersJob'))
					}
					this.persJob.unshift(this.keyword.trim());
					this.$router.push({path:'perJobHunting',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'车辆交易':
					if(!localStorage.getItem('VehicleTran')){
							this.vehicleTran = []
						}else {
							this.vehicleTran = JSON.parse(localStorage.getItem('VehicleTran'))
					}
					this.vehicleTran.unshift(this.keyword.trim());
					this.$router.push({path:'vehTransaction',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'二手物品':
					if(!localStorage.getItem('SecondGoods')){
							this.secondGoods = []
						}else {
							this.secondGoods = JSON.parse(localStorage.getItem('SecondGoods'))
					}
					this.secondGoods.unshift(this.keyword.trim());
					this.$router.push({path:'secondGoods',query: { keyword: this.keyword}});
					this.keyword = '';
					break;
				case	'拼车中心':
					if(!localStorage.getItem('CarpoCer')){
							this.carpoCer = []
						}else {
							this.carpoCer = JSON.parse(localStorage.getItem('CarpoCer'))
					}
					this.carpoCer.unshift(this.keyword.trim());
					this.$router.push({path:'carpoCenter',query: { keyword: this.keyword}});
					this.keyword = '';
					break;

			  }
		  }
		  
    },
    showModel(){
		this.modelState=!this.modelState
		 
		
    },
    handelItem(item){
    	this.current=item
		this.modelState=false
		console.log(this.current);
		if(this.current === '资讯'){
			let hisList = JSON.parse(localStorage.getItem('HisRecords'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.information = hisList
			}
			this.historList = hisList

		}else if(this.current === '商家'){

			let hisList = JSON.parse(localStorage.getItem('Business'))
			

			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.business = hisList
			}
			this.historList = hisList
		}else if(this.current === '活动'){
			let hisList = JSON.parse(localStorage.getItem('Activity'))
			
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.activity = hisList
			}


			this.historList = hisList
		}else if(this.current === '便民电话'){
			let hisList = JSON.parse(localStorage.getItem('CivTelephone'))
			
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.civTelephone = hisList
			}

			this.historList = hisList
		}else if(this.current === '房屋出售'){
			let hisList = JSON.parse(localStorage.getItem('HouSale'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.houSale = hisList
			}			
			this.historList = hisList			
		}else if(this.current === '房屋出租'){
			let hisList = JSON.parse(localStorage.getItem('HouRent'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.houRent = hisList
			}			
			this.historList = hisList			
		}else if(this.current === '企业招聘'){
			let hisList = JSON.parse(localStorage.getItem('EnterRec'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.enterRec = hisList
			}			
			this.historList = hisList			
		}else if(this.current === '个人求职'){
			let hisList = JSON.parse(localStorage.getItem('PersJob'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.persJob = hisList
			}			
			this.historList = hisList			
		}else if(this.current === '车辆交易'){
			let hisList = JSON.parse(localStorage.getItem('VehicleTran'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.vehicleTran = hisList
			}			
			this.historList = hisList			
		}else if(this.current === '二手物品'){
			let hisList = JSON.parse(localStorage.getItem('SecondGoods'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.secondGoods = hisList
			}			
			this.historList = hisList			
		}else if(this.current === '拼车中心'){
			let hisList = JSON.parse(localStorage.getItem('CarpoCer'))
			if(hisList === null){
				this.historList =[]
				return
			}else {
				this.carpoCer = hisList
			}			
			this.historList = hisList			
		}

		

    },
    goSearch(){
    	// this.modelList=true
	},
	
  },
  mounted () {
	  
  }
}
</script>

<style lang="stylus" scoped>
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
      align-items center
      .search-bar
        height .6rem
        float right
        flex 1
        border-radius .3rem
        background white 
        position relative 
        display flex      
        .search-left
          min-width 1.1rem
          display inline-block
          height .6rem
          color #333
          font-size .26rem
          vertical-align top
          line-height .6rem
          letter-spacing 1px
          margin-left .3rem
        .input-search
        	flex 1
        	overflow hidden
	        input
	          height .3rem
	          font-size .13rem
	          letterSpaceing()
	          width 100%
	          outline none   
	          border-left 1px solid #d8d8d8
	          padding-left .2rem
	          margin-left .16rem
	          margin-top .1rem
	          padding-right .28rem
	          box-sizing border-box
	         
	   .concel
		  padding 0 .1rem 0 .31rem
		  font-size .3rem
		  color #333
.list-box
	padding .4rem .25rem
	box-sizing border-box
	letter-spacing 1px
	h2
		font-size .3rem
		color #333
		padding-bottom .1rem
	ul
		li
    		padding .3rem 0
    		font-size .3rem
    		color #666
    	.iconfont
    		float right
    		padding-right .2rem
	.delete
		padding-top .3rem
		font-size .28rem
		color #999
		text-align center
		.iconfont
			margin-right .2rem
.float
    position fixed
    top 1.28rem
    left 0
    right 0
    bottom 0
    background #f0f0f0
    z-index 99
    .model
      background white
      position absolute
      top 0
      width 100%
      overflow hidden
      padding .6rem 0 .6rem .25rem
      display flex
      flex-wrap wrap
      box-sizing border-box
      li
      	line-height .76rem
      	width 30%
      	background-color #f0f0f0
      	font-size .3rem
      	text-align center
      	margin-right .24rem
      	margin-bottom .28rem
      	color #666
      	letter-spacing 1px
.list
	z-index 999
	.model
		padding 0 .25rem 1.5rem
		position absolute
        top 100px
        background-color red
		li
			width 100%
			text-align left
			margin-right 0px
			margin-bottom 0px!important
			line-height .36rem
			padding .3rem 0
			background-color white
			span
				color #058cff
			
</style>