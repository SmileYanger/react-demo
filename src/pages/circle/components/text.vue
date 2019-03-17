<template>
	<div class="t_top">
		<div class="t_header">
			<span class="t_return" @click="Goback">取消</span>
			<span class="t_title">发表文字</span>
			<span class="t_deliver" @click="publish">发表</span>
		</div>
		<div class="t_publish border-bottom">
			 <x-textarea :max="200" :placeholder="('请输入内容...')" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" class="mt20" v-model="textval">
			 </x-textarea>
		</div>
		<!-- <div class="t_mypostion">
			<span class="iconfont">&#xe609;</span>
			<span class="t_postion">我的位置</span>
		</div> -->
		<mt-field  class="mt20" v-model="address" readonly>
            <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe666;</router-link >
        </mt-field>
        <Alert :alertTip="alert" v-show='alertshow'></Alert>
	</div>
</template> 
<script>
	import Vue from 'vue'
	import Alert from 'common/alert'
	Vue.prototype.bus = new Vue()
	export default{
		components:{
			Alert
		},
		data(){
			return{
				textval:'',
				langs:'',
				lat:'',
				address:'我的位置',
				alertshow:false,
				alert:'文字内容不能为空',
			}
		},
		methods:{
			Goback(){
				this.$router.push("/Circle")
			},
			onEvent (event) {
      			console.log('on', event)
    		},
    		//发表文字信息
    		publish(){
    			if(!this.textval == ''){
    				this.$axios({
    				method:'post',
    				data:{
    					do:'quan_text',
    					act:'text',
    					weid:this.$store.state.weid,
    					openid:'o9K-84kr99h7cq8zBG8lBODU8DYg',
    					body:this.textval
    				}
    			}).then(res=>{
    				this.$router.push("/Circle")
    			})
    		}else{
    			this.alertshow = true
    		}
    		},
    		
		},
		mounted:function(){
			var _this=this
     		this.bus.$on('',function(long,lat,address){
			console.log(long,lat,address)
			_this.longs=long
			_this.lat=lat
			_this.address=address
			console.log(_this.address)
      		})
      		this.bus.$on('send',(data)=>{
				console.log(data)
				_this.alertshow = data
			})
		},
	}
</script>
<style lang="stylus" type="text/stylus">
	.t_top
		background #fff
		.t_header
			background rgb(246, 246, 246)
			padding 0.48rem 0.35rem 0.2rem
			font-size 0.32rem
			position relative
			text-align center
			height 0.6rem
			.t_return
				float left
			.t_deliver
				float right
		.t_publish
			margin 0.25rem 0.25rem 0.25rem 0.25rem
			height 2.32rem
		.t_mypostion
			margin 0.25rem
</style>