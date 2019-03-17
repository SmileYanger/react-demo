<template>
<div >
    <header-bar :title="title"></header-bar>
    <div class="box">
        <!-- 文章 -->
        <m-article :listId="listId" class='top65'></m-article>   
    </div>
</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
import MArticle from 'common/information/articles'
export default {
  components:{
    HeaderBar,
    MArticle
  },
  name:'HotDetails',
  data () {
    return {
       title:'资讯详情',   
       listId:this.$route.query.listId,
       details:{},
       recommendList:[]  
    }
  },
 
}
</script>

<style lang="stylus" scoped>
  .box
    overflow hidden
    zoom 1
  .top65
    padding-top 1.28rem
 </style>