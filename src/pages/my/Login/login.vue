<template>
  <div class="login">
    <div class="navigat">
      <i class="iconfont close" @click="$router.go(-1)">&#xe61c;</i>
      <div class="registared" @click="gotoRegister">注册</div>
    </div>
    <div class="username" v-if="isUsername">
      <h2>账户密码登录</h2>
      <mt-field class="login_name login_input" v-model="user" placeholder="请输入手机号码" type="tel"></mt-field>
      <mt-field class="login_password login_input" v-model="password" placeholder="请输入密码" type="password"></mt-field>
      <div class="btn">
        <mt-button @click="passwordLogining" class="login_btn" type="primary" size="large">登录</mt-button>
      </div>
      <div class="other">
        <div @click="handleChangeMobilPhone()">手机快捷登录</div>
        <div>|</div>
        <div @click="gotoForgetpassword">忘记密码&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>
      </div>
    </div>
    <div class="mobileLogin" v-else>
      <h2>手机快捷登录</h2>
      <div class="prompt">未注册过的手机号登录将自动创建中国县域账号</div>
      <mt-field class="login_name login_input" v-model="user" placeholder="请输入手机号码" type="tel">
        <span class="verificationCode" @click="goVerify">{{verifies}}</span>
      </mt-field>
      <mt-field class="login_password login_input" v-model="verifycode" placeholder="请输入验证码" type="password"></mt-field>
      <div class="btn">
        <mt-button @click="verifyLogining" class="login_btn" type="primary" size="large">登录</mt-button>
      </div>
      <div class="other">
        <div @click="handleChangeUsername()">账户密码登录</div>
      </div>
    </div>
    <SignInWith></SignInWith>
  </div>
</template>

<script>
  import SignInWith from '../components/signInWith'
  import Vue from 'vue'
  Vue.prototype.bus=new Vue()

  export default {
    name: "",
    data() {
      return {
        isUsername: true,
        verifies: '获取验证码',
        user: '',
        password: '',
        verifycode: '',
        datas: ''
      }
    },
    components: {
      SignInWith
    },
    methods: {
      handleChangeMobilPhone() {
        this.isUsername = false
      },
      handleChangeUsername() {
        this.isUsername = true
      },
      gotoRegister() {
        this.$router.push('/register')
      },
      gotoForgetpassword() {
        this.$router.push({
          path: '/forgetPassword',
          query: {
            title: '忘记密码'
          }
        })

      },
      goVerify() {
        var el = document.getElementsByClassName('verificationCode')[0]
        if (!(/^1[34578]\d{9}$/.test(this.user))) {
          this.$messagebox.alert('手机号码有误，请重填').then(action => {
          })
          return false
        }
        var countDown = 60
        var timer = this.timer
        timer = setInterval(function () {
          countDown--
          el.innerHTML = '重新发送' + '(' + countDown + ')'
          el.disabled = 'disabled'
          if (countDown == 0) {
            el.innerHTML = '重新发送'
            el.disabled = ''
            clearInterval(timer)
          }
        }, 1000)

        this.$axios({
          method: 'post',
          data: {
            do: 'applogin',
            act: 'verify',
            phone: this.user
          },
        }).then(res => {
          if (res.data.code === '200') {
            console.log(res.data)
          }

        })
      },
      passwordLogining() {
        if (!(/^1[34578]\d{9}$/.test(this.user))) {
          this.$messagebox.alert('手机号码有误，请重填').then(action => {
          })
          return false
        }
        if (this.password === '') {
          this.$messagebox.alert('请输入密码').then(action => {
          })
          return false
        }
        this.$axios({
          method: 'post',
          data: {
            do: 'applogin',
            act: 'pwdlogin',
            phone: this.user,
            password: this.password
          },
        }).then(res => {
          if (res.data.code === '200') {
            console.log(res.data)
            // this.bus.$emit('eventFromMy', res.data.datas.user_tel)
            localStorage.setItem('user_id', res.data.datas.user_tel)
            // localStorage.setItem('openid', res.data.datas.openid)
            this.$store.commit ('changeOpenid',res.data.datas.openid)
            this.$router.go(-1)
          }
          if (res.data.code === '400') {
            this.$messagebox.alert(res.data.msg).then(action => {
            })
          }
        })
      },
      verifyLogining() {
        if (!(/^1[34578]\d{9}$/.test(this.user))) {
          this.$messagebox.alert('手机号码有误，请重填').then(action => {
          })
          return false
        }
        if (this.verifycode === '') {
          this.$messagebox.alert('请输入验证码').then(action => {
          })
          return false
        }
        this.$axios({
          method: 'post',
          data: {
            do: 'applogin',
            act: 'login',
            phone: this.user,
            verify: this.verifycode
          },
        }).then(res => {
          // console.log(res.data)
          if (res.data.code === '200') {
            this.datas = res.data.datas
            // this.bus.$emit('eventFromMy', res.data.datas)
            localStorage.setItem('user_id', res.data.datas.user_tel)
            // localStorage.setItem('openid', res.data.datas.openid)
            this.$store.commit ('changeOpenid',res.data.datas.openid)
            this.$router.go(-1)
          }
          if (res.data.code === '400') {
            this.$messagebox.alert(res.data.msg).then(action => {
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .login

    .navigat
      color rgb(51, 51, 51)
      display flex
      justify-content space-between
      height 1.28rem
      line-height 1.68rem
      padding 0 0.25rem
      i
        font-size 24px
    .username
      h2
        color rgb(51, 51, 51)
        font-size 0.48rem
        font-weight bold
        margin 0.75rem 0.4rem 0.35rem
      .login_name
        margin-top 0.75rem
      .login_input
        font-size 0.3rem
        margin 0 0.2rem
        border-bottom 1px solid rgb(238, 238, 238)
      ::-webkit-input-placeholder
        color rgb(212, 212, 212)
        font-size 0.3rem
      .btn
        margin 0.5rem 0.2rem
        .login_btn
          font-size 0.28rem
          font-weight bold
      .other
        text-align center
        font-size 0.28rem
        color rgb(178, 178, 178)
        div
          display inline-block
          margin 0 0.1rem
    .mobileLogin
      h2
        color rgb(51, 51, 51)
        font-size 0.48rem
        font-weight bold
        margin 0.75rem 0.4rem 0.35rem
      .prompt
        font-size 0.3rem
        color rgb(178, 178, 178)
        margin 0.35rem 0 0.98rem 0.4rem
      .login_name
        margin-top 0.75rem
        .verificationCode
          font-size 0.28rem
          color rgb(133, 133, 133)
          margin-left 0.3rem
      .login_input
        font-size 0.3rem
        margin 0 0.2rem
        border-bottom 1px solid rgb(238, 238, 238)
      ::-webkit-input-placeholder
        color rgb(212, 212, 212)
        font-size 0.3rem
      .btn
        margin 0.5rem 0.2rem
        .login_btn
          font-size 0.28rem
          font-weight bold
      .other
        text-align center
        font-size 0.28rem
        color rgb(178, 178, 178)
        div
          display inline-block
          margin 0 0.1rem
</style>
