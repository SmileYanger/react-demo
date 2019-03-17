<template>
	<div class="list">
		<div 
			class="item" 
			v-for="(item,index) in letters" 
			:key="index"			
			:data-id="item"
			:ref="item"
			@click="handelLetter(item)" 
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			{{item}}
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	Vue.prototype.bus=new Vue()
	export default{
		name:'ListAlphabt',
		 props:{
		 	cities:Object
		 },
		 data(){
		 	return{
		 		touchStatus:false,
		 		startY:0,
		 		timer:''
		 	}
		 },
		 computed:{
		 	letters(){
		 		const letters=[]
		 		for(let i in this.cities){		 			
		 			letters.push(i)
		 		}
		 		return letters		 		
		 	}
		 },
		 updated(){
		 	this.startY=this.$refs['A'][0].offsetTop //A元素距离上边距的距离
		 },
		 methods:{
		 	handelLetter(letter){
				 this.bus.$emit('',letter)
		 	},
		 	handleTouchStart(){
		 		this.touchStatus=true
		 	},
		 	handleTouchMove(e){
		 		if(this.touchStatus){
		 			if(this.timer){
		 				clearTimeout(this.timer)
		 			}
		 			this.timer=setTimeout( ()=>{
		 				const touchY=e.touches[0].clientY   //当前触摸的元素与上边距的距离
			 			const index=Math.floor((touchY - this.startY) / 20)  //当前手指滑动的字母对应的下标		 			
			 			if(index >= 0 && index<this.letters.length){
			 				this.bus.$emit('',this.letters[index])
			 			}		 			
	                    console.log(this.letters[index])
		 			},16)
		 			
		 		}	
		 	},
		 	handleTouchEnd(){
		 		this.touchStatus=false
		 	}
		 }
	}
</script>

<style lang="stylus" scoped="scoped">
	 @import '~styles/varibles.styl'
	
	.list
		position:absolute
		right:0
		top:0
		height:100%
		display:flex
		justify-content: center
		width:0.58rem
		flex-direction:column
		background-color white
		padding-top 1rem
		box-sizing border-box
	.item
		text-align:center
		padding .05rem 0 0
		color:#333
		font-size:.2rem	
</style>