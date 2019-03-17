<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div class="container">
      <div class="phoneAccout">
        <div class="phone">
          <mt-cell title="手机号" is-link>
            <span style="font-size: 0.28rem; color: #999">绑定手机号</span>
          </mt-cell>
        </div>
        <div class="password" @click="changePassword">
          <mt-cell title="修改密码" is-link></mt-cell>
        </div>
      </div>
      <div class="secondAccout">
        <div class="title">第三方账号绑定</div>
        <div class="content">
          <div class="second">
            <mt-cell title="" is-link>
              <span v-if="true" style="font-size: 0.28rem; color: #666">已绑定</span>
              <span v-else style="font-size: 0.28rem; color: #999">未绑定</span>
              <img slot="icon" src="../../../assets/images/user/weibo@2x.png" width="24" height="24">
            </mt-cell>
          </div>
          <div class="second">
            <mt-cell title="" is-link>
              <span style="font-size: 0.28rem; color: #999">未绑定</span>
              <img slot="icon" src="../../../assets/images/user/QQ@2x.png" width="24" height="24">
            </mt-cell>
          </div>
          <div class="second">
            <mt-cell title="" is-link>
              <span style="font-size: 0.28rem; color: #999">未绑定</span>
              <img slot="icon" src="../../../assets/images/user/weixin@2x.png" width="24" height="24">
            </mt-cell>
          </div>
        </div>
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
        title: '账号与绑定设置',
      }
    },
    methods: {
      changePassword() {
        this.$router.push({
          path:'/forgetPassword',
          query:{
            title: '修改密码'
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .container
    .phoneAccout
      padding 0 0.1rem
      .phone
        border-bottom 1px solid #f6f6f6
    .secondAccout
      .title
        padding 0.25rem 0.3rem
        background #f6f6f6
        color #999
    .content
      padding 0 0.1rem
      .second
        border-bottom 1px solid #f6f6f6

</style>
