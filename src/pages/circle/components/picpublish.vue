<template>
	<div class="p_top">
		<div class="p_header">
			<span class="p_return" @click="Goback">取消</span>
			<span class="p_title">发表图片</span>
			<span class="p_deliver" @click="getPicInfo">发表</span>
		</div>
		<div class="p_publish border-bottom">
			 <x-textarea :max="200" :placeholder="('请输入内容...')" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" class="mt20" v-model="textval">
			 </x-textarea>
		</div>
		<mt-field  class="mt20" v-model="address" readonly>
            <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe666;</router-link >
        </mt-field>
		<Up-Circle @fuImg="filePath"></Up-Circle>
	</div>
</template>
<script>
	import Vue from 'vue'
	import UpCircle from '@/pages/circle/components/upcircle'
	Vue.prototype.bus = new Vue()
	export default{
		components:{
			UpCircle,
		},
		data(){
			return{
				textval:'',
				filePathList:[],
				address:'我的位置',
				langs:'',
				lat:'',
			}
		},
		methods:{
			Goback(){
				this.$router.push('/Circle')
			},
			onEvent(event){
				// console.log('on',event)
			},
			filePath(val){
				this.filePathList.push(val)
				console.log(11111111111)
				console.log(val)
			},
			getPicInfo(){
				this.$axios({
					method:'post',
					data:{
						do:'quan_img',
						act:'img',
						weid:this.$store.state.weid,
						openid:'o9K-84mN0qlnbl9zsiwIYg94aw9',
						body:this.textval,
						picpath:this.filePathList.join(",")
					}
				}).then(res=>{
					this.$router.push("/circle")
				})	
			},
		},
		mounted:function(){
			var _this=this
     		this.bus.$on('',function(long,lat,address){
			// console.log(long,lat,address)
			_this.longs=long
			_this.lat=lat
			_this.address=address
			// console.log(_this.address)
      		})
      		this.bus.$on('send',(data)=>{
      			// console.log(data)
      			this.alertshow = data
      		})
		}
	}
</script>
<style type="text/stylus" lang="stylus">
	.p_top
		background #fff
		.p_header
			background rgb(246, 246, 246)
			padding 0.48rem 0.35rem 0.2rem
			font-size 0.32rem
			position relative
			text-align center
			height 0.6rem
			.p_return
				float left
			.p_deliver
				float right
		.p_publish
			margin 0.25rem 0.25rem 0.25rem 0.25rem
			height 2.32rem
		.p_postion
			margin 0 0.25rem 0.25rem 0.25rem 
			display flex
</style>