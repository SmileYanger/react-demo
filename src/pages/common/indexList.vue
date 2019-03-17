<template>
	<div>
	     <div  v-for="(item,index) in listData" :key="item.id"  @click="goDetails(item.id)" >
				<div class="item1" v-if="item.descimgs.length==1">
					<div class="item-left">
						<img :src="item.descimgs[0]">
					</div>
					<div class="item-right">
						<div class="title">{{item.title}}</div>
						<div class="title-detial">
							<div class="title-size">
								<img src="../../assets/images/home/top.png">
								<span>{{item.time}}</span>
								<span>{{item.yuedu}}阅读</span>
							</div>
							<div class="iconfont" @click.stop="clickOptions(index,item.id,item.is_shou)">&#xeee0;</div>
						</div>
					</div>
					<div class="model" v-show="index==modelState">
						<ul>
							<li @click.stop="collect(item.is_shou)">
								<div v-if="item.is_shou==0">
									<i class="iconfont"> &#xe60a;</i>								
								  收藏
								</div>
								<div v-if="item.is_shou==1">
									<i class="iconfont collected"> &#xe60a;</i>								
								  已收藏
								</div>
							</li>
							<li @click.stop="clickClose">
								<i class="iconfont"> &#xe687;</i>
								不感兴趣
							</li>
						</ul>
						<span class="close" @click.stop="clickClose()">
							<i class="iconfont"> &#xe61c;</i>
						</span>
					</div>
				</div>
				<div class="item2" v-if="item.descimgs.length==3">
					<div class="item2-title">{{item.title}}</div>
					<div class="item2-img" >			
						<img v-for="(m,index) in item.descimgs" :key='index' :src="m">
					</div>
					<div class="item2-detial">
						<div class="title-size">
							<img src="../../assets/images/home/top.png">
							<span>{{item.time}}</span>
							<span>{{item.yuedu}}阅读</span>
						</div>
						<div class="iconfont" @click.stop="clickOptions(index,item.id,item.is_shou)">&#xeee0;</div>
					</div>
					<div class="model" v-show="index==modelState">
						<ul>
							<li @click.stop="collect(item.is_shou)">
								<div v-if="item.is_shou==0">
									<i class="iconfont"> &#xe60a;</i>								
								  收藏
								</div>
								<div v-if="item.is_shou==1">
									<i class="iconfont collected"> &#xe60a;</i>								
								  已收藏
								</div>
							</li>
							<li @click.stop="clickClose">
								<i class="iconfont"> &#xe687;</i>
								不感兴趣
							</li>
						</ul>
						<span class="close" @click.stop="clickClose">
							<i class="iconfont"> &#xe61c;</i>
						</span>
					</div>
				</div>
				<div class="item3" v-if="item.descimgs.length==0">
					<div class="item3-title">{{item.title}}</div>
					<div class="item3-detial">
						<div class="title-size">
							<img src="../../assets/images/home/top.png">
							<span>{{item.time}}</span>
							<span>{{item.yuedu}}阅读</span>
						</div>
						<div class="iconfont" @click.stop="clickOptions(index,item.id,item.is_shou)">&#xeee0;</div>
					</div>
					<div class="model" v-show="index==modelState">
						<ul>
							<li @click.stop="collect(item.is_shou)">
								<div v-if="item.is_shou==0" >
									<i class="iconfont"> &#xe60a;</i>								
								  收藏
								</div>
								<div v-if="item.is_shou==1">
									<i class="iconfont collected"> &#xe60a;</i>								
								  已收藏
								</div>
							</li>
							<li @click.stop="clickClose">
								<i class="iconfont"> &#xe687;</i>
								不感兴趣
							</li>
						</ul>
						<span class="close" @click.stop="clickClose">
							<i class="iconfont"> &#xe61c;</i>
						</span>
					</div>
				</div>
	  	</div>
	</div>
</template>

<script>
export default {

  name: 'IndexList',
  data () {
    return { 
	      page:1,
	      modelState:'aa' ,
	      id:'',
	      listData:[]
    }
  },
  methods:{
  	clickOptions(index,id){
  		this.modelState=index
  		this.id=id
  	},  	
  	clickClose(index){
  		this.modelState='aa'
  	},
  	goDetails(id){
  		console.log(id)
  		this.$router.push({path:'/hotdetails',query:{listId: id}})
  	},
  	collect(){  //点击收藏
  		console.log(this.id)
  		var _this=this
        this.$axios({  
        method: 'post',
        data:{
         do:'shoucang',
         act:'zixun',
         weid:98,
         id:_this.id,
         openid:this.$store.state.openid
        },
        }).then(res=>{
        	console.log(res)
        	console.log(this.$store.state.openid)
          if(res.data.code==402 || res.data.code==401){
            this.$router.push('/login')
            this.modelState='aa'
          }else{
          	this. getAllNews()
          }
        	
      })
  	},
  	getAllNews(){  //全部
      this.$axios({  
      method: 'post',
      data:{
       do:'xinwen_all',
       weid:98,
       page:this.page,
       psize:8,
       act:'all',
       openid:this.$store.state.openid,
      },
      }).then(res=>{
        console.log(res)
        console.log(this.$store.state.weid)
        this.listData=res.data.datas
      }) 
    },
  },
  created(){
  	this.getAllNews()
  	console.log(this.weid)
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
	.item1,.item2,.item3
		display flex
		width 100%
		padding 0.35rem 0.25rem
		box-sizing border-box
		background-color: #FFF
		border-bottom 0.001rem solid #eee
	.title-detial,.item2-detial,.item3-detial
		display flex
		justify-content space-between
		align-items center
		margin-top 0.4rem
		.title-size
			color rgb(178,178,178)
			font-size 0.2rem
			img
				width 0.49rem
				height 0.26rem
			span
				margin 0 0.05rem
	.item1
		justify-content space-between
		position relative
		.item-left
			width 2.28rem
			height 1.50rem
			margin-right 0.3rem
			img
				width 2.28rem
				height 1.50rem
				display  inline-block
		.item-right
			display flex
			flex-direction column
			justify-content center
			overflow hidden
			flex 1
			.title
				ellipsis()
				color rgb(51,51,51)
				font-size 0.3rem
	.item2,.item3
		flex-direction column
		position relative
		.item2-title
			ellipsis()
			margin-bottom 0.16rem
		.item2-img
			display flex
			justify-content space-between
			// height 1.5rem
			img
				width 2.25rem
				height 1.50rem	
		.item2-detial
			margin-top 0.15rem
	.item3
		.item3-title
			display -webkit-box    
			-webkit-box-orient vertical    
			-webkit-line-clamp 2  
			overflow hidden
.model
	width 4rem
	background-color rgba(240,240,240,.9)
	position absolute
	right 0px
	top 0
	bottom 0px
	margin auto 0
	display flex
	float right
	ul
		display flex
		justify-content center
		align-items center
		flex 1	
		height 100%
		letter-spacing 1px
		li
			text-align center
			font-size .24rem
			color #333
			.iconfont
				display block
			.collected
				color orange
		li:nth-child(1)
			margin-right .7rem
	span
		position absolute
		right .3rem
		bottom .2rem
</style>