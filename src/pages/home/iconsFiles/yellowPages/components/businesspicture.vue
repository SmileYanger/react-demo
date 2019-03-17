<template>
	<div class="box">
		<header-bar :title="title"></header-bar>
		<div style="padding-top: 1.28rem">
		    <!-- 商家LOGO -->
		    <div class="house-pic mt20">
	            <p class="pic-title">商家资质 <i>（请上传商家logo或者门面店图）</i></p>
	            <ul >
	                
					<Upcircle @logoImg="fileLogo"></Upcircle>
	            </ul>
	        </div>
	        <!-- 商家图片 -->
	        <div class="house-pic mt20">
	            <p class="pic-title">商家图片 <i>（请上传商家图片,最多9张）</i></p>
	            <ul >
	               
					<Upcircle @fuImg="fileList"></Upcircle>
	            </ul>
	        </div>
		    <!-- 商家资质 -->
	        <div class="house-pic">
	            <p class="pic-title">商家资质 <i>（请上传商家营业执照、营业许可证图片）</i></p>
	            <ul>
	                
					<Upcircle @fuImg="fileList"></Upcircle>
	            </ul>
	        </div>
	        <p class="agree">
	        	 <check-icon :value.sync="agree"> 
	        	 	{{('我已阅读并同意?') }}
	        	 	<i>【免责声明】</i>
	        	 </check-icon>
	        </p>
	        <span class="submit" @click="subFromDate">确定</span>
    	</div>
				
	</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
import Upcircle from 'common/uploader'
import { MessageBox } from 'mint-ui';

export default {
  name:'BusinessPicture',
  components:{
	  HeaderBar,
	  Upcircle
  },
	created () {

	},
  data () {
    return {
    	title:'商家图片',
		agree:false,
		newFileList:[], //商家多图
		newLogo:[],  //商家logo
		newBusDate:'' //商家信息
    }
  },
  created () {
	//拿到商家的信息
	this.newBusDate = this.$route.query
	console.log(this.$route.query);
  },
  methods:{
  	Goback(){   
      this.$router.go(-1)
	},
	//接受图片从后台返回的 filelist
	fileList(val){	
		this.newFileList.push(val)
		console.log(this.newFileList.join(','));
	},
	//商家的logo
	fileLogo(val){
		this.newLogo.push(val)
		console.log(this.newLogo.join(','));
	},
	//提交表单数据
	async subFromDate(){
		const {data:res} = await this.$axios({
			method:'post',
			data:{
				do:'fabu',
				type:8,
				filelist:this.newFileList.join(','),
				weid:this.$store.state.weid,
				name: this.newBusDate.merchantName,
				tel:this.newBusDate.contactNumber,
				address:this.newBusDate.companyAddress,
				yingye:this.newBusDate.endTime,
				body:this.newBusDate.businessIntroduction,
				blei:this.newBusDate.hangye,
				thumb:this.newLogo.join(',')
			}
		})
		if(res.code !== '200') return console.log("入住失败");
		
		MessageBox({
			title: '提示',
			message: `您的信息已提交，等待审核通过后即可<br />入住成功！`,
		}).then(()=>{
			
			setTimeout(() => {
				this.$router.push( {path: 'yellowPages'})
				
			}, 500);
		});
		

		console.log(res);

	},
  },
  
}
</script>

<style lang="stylus" scoped>
  .box
  	background-color #f6f6f6
  .mt20
  	margin-bottom .2rem
  .house-pic
    height auto
    padding 0.3rem 0.25rem 
    box-sizing border-box
    width 100%
    background white
    zoom 1
    overflow hidden
    .pic-title
        font-size 0.3rem
        color #333
        i 
            color #ccc
            font-size 0.26rem
            
    ul li
        width 1.2rem
        height 1.2rem
        float left
        margin-right .23rem
        margin-top 0.24rem
        position relative
    ul li:nth-child(5n)
    	margin-right 0
    img
        width 1.2rem
        height 1.2rem
    .iconfont
    	position absolute
    	top -0.15rem
    	right -0.1rem
    .add
        border 1px solid #ccc  
.submit
    width 7rem
    line-height 0.8rem
    background #3d8afe
    text-align center
    display  block
    font-size .3rem 
    color #fff
    border-radius .06rem
    margin 0.6rem auto 
    letter-spacing 1px 
.agree      
	text-align center
	padding-top .3rem
	font-size .24rem
	color #333
	letter-spacing 1px
	i
		color #228fff
.box >>>  .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
	color #228fff
	font-size 15px
.box >>> .weui-icon-success,	
.box >>> .weui-icon-circle
	font-size 15px!important
</style>