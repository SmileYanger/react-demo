<template>
  <div style="background: #f6f6f6">
    <div class="head">
      <div class="avatar_title">
        <button class="avatar">
          <img v-if="dict.img != '' && dict.img" :src="dict.img" alt="">
          <img v-else src="../../assets/images/user/me.png" alt="">
        </button>
        <span class="login" v-if="dict.name && dict.name !== ''" @click="handleClickLogin()">{{dict.name}}</span>
        <span class="login" v-else @click="handleClickLogin()">登录/注册</span>
      </div>
      <div class="message" @click="gotoPersonal">
        <img src="../../assets/images/user/user.png" alt="">
        <span>个人信息</span>
      </div>
    </div>
    <news-release :id="id"></news-release>
    <div class="content">
      <div class="mine">
        <div @click="handleClickCollection">
          <mt-cell title="我的收藏" is-link></mt-cell>
        </div>
        <div class="line"></div>
        <div @click="handleClickBrowsing">
          <mt-cell title="我的浏览" is-link></mt-cell>
        </div>
      </div>
      <div class="user">
        <div @click="handleClickFeedback">
          <mt-cell title="帮助与反馈" is-link></mt-cell>
        </div>
        <div class="line"></div>
        <div @click="handleClickSystemSetting">
          <mt-cell title="系统设置" is-link></mt-cell>
        </div>
      </div>
    </div>
    <tabbar></tabbar>
    <release v-show="showModel"></release>
  </div>
</template>

<script>
  import Tabbar from 'common/Tabbar'
  import NewsRelease from './components/newsRelease'
  import Release from '@/pages/release/Release'
  import Vue from 'vue'

  Vue.prototype.bus = new Vue()

  export default {
    name: 'My',
    components: {
      Tabbar,
      NewsRelease,
      Release
    },

    data() {
      return {
        showModel: '',
        dict: {},
        id: this.$store.state.openid
      }
    },
    created() {
      this.getUserInfo(localStorage.getItem('user_id'))
    },
    mounted: function () {
      var _this = this
      this.bus.$on('', function (value) {
        _this.showModel = value
      })
    },
    methods: {
      handleClickLogin() {
        this.$router.push('./login')
      },
      handleClickFeedback() {
        this.$router.push({
          path: './customerFeedback',
          query: ''
        })
      },
      handleClickSystemSetting() {
        this.$router.push('./systemSetting')
      },
      gotoPersonal() {
        this.$router.push({
          path: './personalInformation',
          query: {
            dict: this.dict
          }
        })
      },
      handleClickCollection() {
        this.$router.push('./myCollection')
      },
      handleClickBrowsing() {
        // this.$router.push('./myBrowsing')
      },
      getUserInfo(user_tel) {
        console.log(user_tel)
        if (!user_tel) {
          return
        }
        this.$axios({
          method: 'post',
          data: {
            do: 'userinfo',
            act: 'UserInfo',
            user_tel: user_tel
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.dict = res.data.datas
          }
          if (res.data.code === '400') {

          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .head
    position relative
    height 3.85rem
    background-image url("../../assets/images/user/s.png")
    background-size contain
    overflow hidden
    .avatar_title
      margin-top 1.16rem
      .avatar
        height 1.28rem
        width 1.28rem
        border-radius 50%
        overflow hidden
        margin 0.1rem 0.3rem 0 0.5rem
        img
          width 1.28rem
          height 1.28rem

      .login
        font-size 0.32rem
        color rgb(51, 51, 51)
        font-weight 600
        letter-spacing 2px
    .message
      width 2.1rem
      height 0.78rem
      background-color #87cafa
      border-top-left-radius 20px
      border-bottom-left-radius 20px
      position absolute
      bottom 1.15rem
      right 0
      img
        width 0.35rem
        margin 0.3rem 0.1rem 0.3rem 0.23rem
      span
        color #fff
        margin-top 0.23rem
        font-size 12px

  .mine
    margin-top 0.15rem
    background-color #fff
    font-size 0.3rem
    color rgb(51, 51, 51)
    .line
      border-bottom 0.01rem solid rgb(238, 238, 238)
      margin-left 0.1rem

  .user
    margin-top 0.15rem
    background-color #fff
    font-size 0.3rem
    color rgb(51, 51, 51)
    .line
      border-bottom 0.01rem solid rgb(238, 238, 238)
      margin-left 0.1rem
</style>
