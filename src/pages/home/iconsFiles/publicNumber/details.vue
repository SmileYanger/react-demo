<template>
<div >
    <header-bar :title="title"></header-bar>
    <div style="padding-top: 1.28rem">
        <!-- 文章 -->
        <Artic :listId="listId"></Artic>
    </div>
</div>
</template>

<script>
import HeaderBar from 'common/headerbar'
import Artic from '@/pages/home/iconsFiles/publicNumber/articles.vue'
export default {
  name:'detail',
  components:{
    HeaderBar,
    Artic
  },
  data () {
    return {
       title:'服务公众号', 
       listId:this.$route.query.listId, 
    }
  },
  methods:{

  },
}
</script>

<style lang="stylus" scoped>

 </style>