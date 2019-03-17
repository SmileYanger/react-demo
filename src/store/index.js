import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// let defaultCity="榆林"
// 	try {
// 		if(localStorage.city ){
// 			defaultCity = localStorage.city 
// 		}
		
// 	}catch(e){} 
	
export default new Vuex.Store({
	
	state:{
		city:'',
		weid: '',
		url:'http://weixianyu.oss-cn-zhangjiakou.aliyuncs.com/',
		openid:''
	},
	actions:{
		changeCity (ctx,city){
			ctx.commit('changeCity',city)
		},
		changeWeid (ctx,weid){
			ctx.commit('changeWeid', weid)
		},
		changeOpenid (ctx,openid){
			ctx.commit('changeOpenid', openid)
		}
	},
	mutations:{
		changeCity (state,city){
			state.city=city
			try {
					localStorage.city=city
			}catch(e){}
		},
		changeWeid(state, weid){
			state.weid = weid
			try {
				localStorage.weid = weid
			} catch (e) {}
		},
		changeOpenid(state, openid) {
			state.openid = openid
			try {
				localStorage.openid = openid
			} catch (e) {}
		}
	}
})
