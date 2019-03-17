<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div class="register">
      <mt-field class="login_name login_input" v-model="user" placeholder="请输入手机号码" type="tel" :attr="{maxlength: 11}">
        <span class="verificationCode" @click="goVerify">{{verifies}}</span>
      </mt-field>
      <mt-field class="login_code login_input" v-model="verifycode" placeholder="请输入验证码"></mt-field>
      <mt-field class="login_password login_input" v-model="password" placeholder="请输入新密码（6-18位英文或数字）"
                type="password" :attr="{maxlength: 18}"></mt-field>
      <mt-field class="login_password2 login_input" v-model="newPassword" placeholder="请确认新密码"
                type="password" :attr="{maxlength: 18}"></mt-field>
      <div class="btn" v-if="user != '' && verifycode != '' && password != '' && newPassword != ''">
        <mt-button class="register_btn1" type="primary" size="large" @click="register">注册</mt-button>
      </div>
      <div class="btn" v-else>
        <mt-button class="register_btn" type="default" size="large">注册</mt-button>
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
        title: '注册账号',
        verifies: '获取验证码',
        user: '',
        verifycode: '',
        password: '',
        newPassword: '',
      }
    },
    methods: {
      goVerify() {
        var el = document.getElementsByClassName('verificationCode')[0]

        console.log(el)

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
      register() {
        if (!(/^1[34578]\d{9}$/.test(this.user))) {
          this.$messagebox.alert('手机号码有误，请重填').then(action => {
          })
          return false
        }
        if (this.password !== this.newPassword) {
          this.$messagebox.alert('两次密码输入有误，请重新输入').then(action => {
          })
          return false
        }
        this.$axios({
          method: 'post',
          data: {
            do: 'applogin',
            act: 'regist',
            phone: this.user,
            verify: this.verifycode,
            password: this.password
          },
        }).then(res => {
          if (res.data.code === '200') {
            this.$messagebox.alert(res.data.msg).then(action => {
            })
          }
          if (res.data.code === '201') {
            this.$messagebox.alert(res.data.msg).then(action => {
            })
          }
          console.log(res.data)
        })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .register
    margin-top 0.55rem
    .login_name
      margin-top 0.75rem
      .verificationCode
        font-size 0.26rem
        color rgb(133, 133, 133)
        margin-left 0.3rem
        display inline-block
        padding 0.1rem
        text-align center
    .login_input
      font-size 0.28rem
      margin 0 0.2rem
      border-bottom 1px solid rgb(238, 238, 238)
    ::-webkit-input-placeholder
      color rgb(212, 212, 212)
      font-size 0.28rem
    .btn
      margin 0.5rem 0.2rem
      .register_btn
        font-size 0.28rem
        font-weight bold
        color #fff
        background rgb(226, 226, 226)
      register_btn1
        font-size 0.28rem
        font-weight bold
        color #fff
</style>
