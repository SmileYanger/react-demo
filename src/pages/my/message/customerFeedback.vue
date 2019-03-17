<template>
  <div>
    <head-nav :title="title" :rightTitle="rightTitle"></head-nav>
    <div class="problem">
      <div class="title"><span>o</span>常见问题</div>
      <div class="list" v-for="(item, index) in lists" :key="index" @click="gotoProblem(item.id)">
        <mt-cell :title="item.question" is-link></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
  import headNav from '../components/headNav'

  export default {
    name: "",
    components: {
      headNav
    },
    data() {
      return {
        title: '常见问题',
        rightTitle: '意见反馈',
        lists: []
      }
    },
    methods: {
      gotoProblem(id) {
        console.log(id)
        this.$router.push({
          path: 'commonProblem',
          query: {
            id: id
          }
        })
      },
      getProblemInfo() {
        this.$axios({
          method: 'post',
          data: {
            do: 'userinfo',
            act: 'helplist'
          },
        }).then(res => {

          if (res.data.code === '200') {
            this.lists = res.data.datas
          }
        })
      },
    },
    mounted() {
      this.getProblemInfo()
    }
  }

</script>

<style scoped lang="stylus" type="text/stylus">
  .problem
    margin-top 1.28rem
    padding 0.3rem 0.2rem
    border-top 0.2rem solid rgb(238, 238, 238)
    .title
      color #333
      font-size 0.3rem
      font-weight bold
      margin-bottom 0.2rem
      span
        color #e81a00
        margin 0.1rem
    .list
      border-bottom 1px solid rgb(238, 238, 238)
      color #333
</style>
