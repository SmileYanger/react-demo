<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div class="container">
      <div class="title">
        {{data.question}}
      </div>
      <p>{{data.answer}}</p>
      <div class="btn">
        <span>
          <i class="iconfont">&#xe620;</i>
          已解决
        </span>
        <span>
          <i class="iconfont">&#xe674;</i>
          未解决
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from 'common/headerbar.vue'

  export default {
    name: "",
    components: {
      HeaderBar
    },
    data() {
      return {
        title: '常见问题',
        data: {}
      }
    },
    created() {
      this.getProblemDetailInfo(this.$route.query.id)
    },
    methods: {
      getProblemDetailInfo(id) {
        this.$axios({
          method: 'post',
          data: {
            do: 'userinfo',
            act: 'helpinfo',
            id: id
          },
        }).then(res => {

          if (res.data.code === '200') {
            this.data = res.data.datas
            console.log(this.data)
          }
        })
      },
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .container
    padding 0.5rem 0.25rem
    .title
      font-size 0.32rem
      color #333
      font-weight bold
      margin-bottom 0.2rem
    p
      font-size 0.28rem
      line-height 1.8
      letter-spacing 0.02rem
      color #666
    .btn
      display flex
      justify-content space-around
      margin 0.64rem
      span
        font-size 0.26rem
        color #999
        display inline-block
        width 1.9rem
        height 0.58rem
        text-align center
        border 0.01rem solid rgb(230, 230, 230)
        border-radius 0.05rem
        .iconfont
          margin-right 0.12rem
</style>
