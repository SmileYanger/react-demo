<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div class="setting" style="padding-top: 1.29rem">
      <div class="account" @click="gotoAccoutSetting">
        <mt-cell title="账户与绑定设置" is-link></mt-cell>
      </div>
      <div class="container">
        <div class="font">
          <mt-cell title="字体大小" is-link>
          </mt-cell>
        </div>
        <div class="switch">
        <mt-cell title="非WIFI网络不下载图片" style="padding-right: 0.1rem">
        <mt-switch v-model="isWIFI" @change="download"></mt-switch>
        </mt-cell>
        </div>
        <div class="switch">
        <mt-cell title="推送通知" style="padding-right: 0.1rem">
        <mt-switch v-model="isPush" @change="pushNotifigation"></mt-switch>
        </mt-cell>
        </div>
        <div class="switch">
        <mt-cell title="声音" style="padding-right: 0.1rem">
        <mt-switch v-model="isSound" @change="sound"></mt-switch>
        </mt-cell>
        </div>
        <div class="clear">
          <mt-cell title="清理缓存">
            <span style="font-size: 0.24rem; margin-right: 0.2rem">104.5M</span>
          </mt-cell>
        </div>
      </div>
      <div class="with">
        <mt-cell title="关于" is-link>
        </mt-cell>
      </div>
      <div class="signOut" @click="signOut">退出登录</div>
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
        title: '系统设置',
        isWIFI: false,
        isPush: true,
        isSound: true
      }
    },
    methods: {
      download() {
        console.log(this.isWIFI)
      },
      pushNotifigation() {
        console.log(this.isPush)
      },
      sound() {
        console.log(this.isSound)
      },
      signOut() {
        localStorage.removeItem('user_id')
        this.$store.commit ('changeOpenid','')
        this.$router.go(-1)
      },
      gotoAccoutSetting() {
        this.$router.push('./accoutSetting')
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .setting
    color rgb(51, 51, 51)
    font-size 0.3rem
    font-weight bold
    .account
      padding 0 0.2rem
      border-bottom 0.2rem solid #f6f6f6
    .container
      padding 0 0.2rem
      border-bottom 0.2rem solid #f6f6f6
      .font
        border-bottom 1px solid #f6f6f6
      .switch
        border-bottom 1px solid #f6f6f6
    .with
      padding 0 0.2rem
      border-bottom 0.2rem solid #f6f6f6
    .signOut
      text-align center
      margin-top 0.3rem
</style>
