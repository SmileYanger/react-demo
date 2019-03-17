<template>
	<div>
		<city-search :cities="cities" :countyObjs='countyObjs'></city-search>
		<city-list :hotCity="hotCity" :cities="cities" :newCounty='newCounty' ></city-list>
		<city-alphabet :cities="cities"></city-alphabet>
	</div>
</template>

<script>
	import axios from 'axios'
	import CitySearch from './components/search.vue'
	import CityList from './components/list.vue'
	import CityAlphabet from './components/alphabet.vue'
	import cityObjs from '../../assets/js/city.js'
	import Vue from 'vue'
	var bus = new Vue()
	export default{
		name:'City',
		components:{
			CitySearch,
			CityList,
			CityAlphabet
		},
		data(){
			return{
				hotCity:[],
				cities:{},
				countyObjs:{},
				newCounty:  '', //县
				// newCityId:'', //市id
			}
		},
		
		methods:{
			 getCityLocation(){
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(async (r)=>{
					if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					let	longiTude = r.point.lng
					let	latiTude = r.point.lat
					let op = latiTude + ',' + longiTude
					const {data:res} = await this.$axios({
						method:'post',
						data:{
						do:'map',
						op:op
						}
					})
					console.log(112233);
					console.log(res.result.ad_info);

						let  id = res.result.ad_info.adcode
						this.getAcquiringCounty(id)

					}
				})
			 },
			async getAcquiringCounty(ctId){
				const {data:res} = await this.$axios({
				method:'post',
				data:{
					do:'common',
					districtid:ctId,
					sign:'87126dee0e09e612981c63ece01a8715'
				}
				})
				if(res.code !== '200') return console.log(res.msg);
				// console.log(112233)
				//  console.log(res);
				// 获取到县域id  传到vuex中 
				// let id = res.datas.id
				// this.$store.commit ('changeWeid',id)

				// // 省
					localStorage.setItem('province',res.datas.provincename)              
				// 		// 市
						// localStorage.setItem("bus",res.datas.cityname)
						// localStorage.setItem("currentCity",res.datas.cityname)
				// 		// 区
					localStorage.setItem("area",res.datas.districtname)
					localStorage.setItem('city',res.datas.districtname)
					this.$store.commit ('changeCity',res.datas.districtname)
				// console.log(res.datas.districtname);
				this.newCounty = res.datas.districtname
				// this.newCityId = res.datas.cityid
			},



		
			getCityListSucc(){
				
				let newa = {}	
				// console.log(112233445566)			
				// console.log(cityObjs)
				// console.log(cityObjs.searchLetter)
				cityObjs.searchLetter.forEach(element => {
					// console.log(element)
					let newb = []
					cityObjs.cityObj.forEach(ele => {
						// console.log(ele)

						if(element === ele.initial){
							newb.push(ele)														
						}
					});
					newa[element] = newb
					
				});
				
				// console.log(1122323)
				// console.log(newa)
				this.cities = newa
				this.countyObjs = cityObjs.countyObjs
			},
			
			
		},
		mounted(){
			
			
		},
		created() {
			this.getCityLocation()
			this.getCityListSucc()
			
		},
	}
</script>

<style>
</style>