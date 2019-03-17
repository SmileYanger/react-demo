<template>
	<div class="p_top">
		<div class="p_header">
			<span class="p_return" @click="Goback">取消</span>
			<span class="p_title">发表视频</span>
			<span class="p_deliver" @click="getVideoInfo">发表</span>
		</div>
		<div class="p_publish border-bottom">
			 <x-textarea :max="200" :placeholder="('请输入内容...')" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" class="mt20" v-model="textval">
			 </x-textarea>
		</div>
		<mt-field  class="mt20" v-model="address" readonly>
            <router-link  tag="i" class="iconfont"  to="./mymap2">&#xe666;</router-link >
        </mt-field>
        <div class="house-pic">
            <ul>
               <li v-for="(file, index) of files">
                   <video :src="file.src"  class="vod" controls></video>
                   <div id="output"></div>
                   <i class="iconfont" @click="remove(index)">&#xe674;</i>
               </li>
               <li v-if="status == 'ready'" @click="add">
                    <div @click="add" class="add">
                       +
                   </div>
               </li>
           	</ul>
        </div>
		<input type="file" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf" @change='onFileChange' ref="file"> 
		<Alert :alertTip="alert" v-show='alertShow'></Alert>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Alert from 'common/alert'
	Vue.prototype.bus=new Vue()
	export default{
		components:{
			Alert
		},
		data(){
			return{
				textval:'',
				filePathList:[],
				name:'',
				fileName:'',
				address:'我的位置',
				langs:'',
				lat:'',
				files:[],
				status: 'ready',
				alertShow:false,
				alert:'文字内容不能为空',
			}
		},
		methods:{
			add() {
				this.$refs.file.click()
            },
			Goback(){
				this.$router.push('/Circle')
			},
			onEvent(event){
				// console.log('on',event)
			},
			openMap(){
				this.$router.push('/cmap')
			},
			isContain(file) {
              return this.files.find((item) => item.name === file.name && item.size === file.size)
            },
          	remove(index) {
            	this.files.splice(index, 1)
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            html5Reader(){
            	var video, output;
				var scale = 0.8;
				var initialize = function() {
					output = document.getElementById("output");
					video = document.getElementById("video");
					// video.addEventListener('loadeddata',captureImage);
				};
				var captureImage = function() {
				            var canvas = document.createElement("canvas");
				            canvas.width = video.videoWidth * scale;
				            canvas.height = video.videoHeight * scale;
				            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
				//  			video.setAttribute("poster", canvas.toDataURL("image/png"));
				            var img = document.createElement("img");
				            img.src = canvas.toDataURL("image/png");
				            output.appendChild(video);
				};
				initialize();
			},
			async onFileChange(e){
				const list = this.$refs.file.files
				/*console.log(list)
				console.log(33333)*/
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader()
                        this.files.push(item)
                    }
                }
                // this.html5Reader()
                // this.files = e.target.files
				var files = e.target.files || e.dataTransfer.files;
				// console.log(e)
				const formData = new FormData()                       
                formData.append('file', files[0])
				if(!files.length)return;
				this.$axios({
					url : 'https://www.weixianyu.cn/app/index.php?i=192&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=ossvod&m=zh_tcwq',
					method:'post',
					data:formData,
					istype:1,
				}).then(res=>{
					// console.log(res)
					this.data = res.data
					if(res.data.code == '400'){
						alert("视频大小出错")
					}else{
						this.fileName = res.data.datas.filename
						// console.log(res.data.datas.filename)
					}
				})
			},
			//上传视频
			getVideoInfo(){
				if(!this.textval==""){
					this.$axios({
					method:'post',
					data:{
						do:'quan_img',
						act:'vod',
						weid:this.$store.state.weid,
						openid:'o9K-84mN0qlnbl9zsiwIYg94aw9',
						body:this.textval,
						picpath:this.fileName
					}
					}).then(res=>{
						this.$router.push("/circle")
						this.textval=''
						this.address='我的位置'
					})
				}else{
					this.alertShow = true
				}
				
			},
		},
		mounted:function(){
			var _this=this
     		this.bus.$on('',function(long,lat,address){
		        _this.longs=long
		        _this.lat=lat
		        _this.address=address
      		})
      		this.bus.$on('send',(data)=>{
      			console.log(data)
      			this.alertShow = data
      		})
		},
		created () {
            
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
			.expansion
				position fixed
				right 0.25rem
		.house-pic
			height auto
			padding 0.3rem 0.25rem 
			box-sizing border-box
			width 100%
			background white
			zoom 1
			overflow hidden
			ul li
				width 1.2rem
				height 1.2rem
				float left
				margin-right .23rem
				margin-top 0.24rem
				position relative
				video
					width 1.2rem
					height 1.2rem
			img
				width 1.2rem
				height 1.2rem
			.iconfont
				position absolute
				top -0.07rem
				right 0
				color #fff
			.add
				border 1px solid #ccc  
				width 1.2rem
				height 1.2rem
				font-size .6rem
				text-align center
				line-height 1.2rem
				color #ccc
		input[type="file"] 
			display none
</style>