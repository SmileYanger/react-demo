<template>
<div >
    <header-bar :title="title"></header-bar>
    <div style='padding:1.58rem 0.3rem  0.2rem  0.3rem'>
      <img :src="detailImg | url" class="banner"  >
    </div>
   	 <div class="content" >
   	     <h2>介绍</h2>
        {{detailIntroduction}}
       
    </div>
</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
import PublishComments from 'common/information/publishcomments'
import Publish from 'common/information/publish'
import Recommend from 'common/information/recommend'
import MArticle from 'common/information/articles'
export default {
  name:'myDetails2',
  components:{
    HeaderBar,
    PublishComments,
    Publish,
    Recommend,
    MArticle
  },
  created () {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id
    // 页面加载详情页
    this.getDetailsPage()
  },
  data () {
    return {
       title:'特色产品详情',
       id:'', //详情页id
       detailImg:'', //详情页图片
       detailIntroduction:'', //详情介绍
    }
  },
  methods:{
    // 根据id获取详情页
    async getDetailsPage(){
      const {data:res} = await this.$axios({
        method:'post',
        data:{
          do:'merchant',
          act:'tsmp_details',
          id:this.id,
          weid:this.$store.state.weid,
        }
      })
      console.log(res);
      if(res.code !== '200') return console.log("请求数据失败");
      this.detailImg = res.datas.thumb
      this.detailIntroduction = res.datas.content
    }
  },
}
</script>

<style lang="stylus" scoped>
    .banner
    	width 7.5rem
    	height 4.5rem
	.content
	  font-size 0.32rem
	  color rgb(51,51, 51)
	  line-height 0.5rem
	  padding 0 .25rem 1rem .25rem
	  box-sizing border-box
	  h2
	  	padding .2rem 0 .1rem
	  	font-size .4rem
	  	color #333
	  	box-sizing border-box
	  	letter-spacing 1px
	  img
	    width 100%
	    padding .5rem 0
 </style>