<template>
<div >
    <header-bar :title="title"></header-bar>
    <div>
        <!-- 文章 -->
        <m-article></m-article>

        <!-- 推介 -->
        <recommend></recommend>

        <!-- 评论 -->
        <publish></publish>

        <!-- 发布评论 -->
        <publish-comments></publish-comments>
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
  components:{
    HeaderBar,
    PublishComments,
    Publish,
    Recommend,
    MArticle
  },
  data () {
    return {
       title:'信息详情',      
    }
  },
  methods:{
  },
}
</script>

<style lang="stylus" scoped>

 </style>