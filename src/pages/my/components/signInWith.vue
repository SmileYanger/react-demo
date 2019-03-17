<template>
  <div class="sign">
    <div class="sign_title">———— 第三方登录 ————</div>
    <div class="sign_imgs">
      <a href=""><img src="../../../assets/images/user/weixin@2x.png" alt=""></a>
      <a href=""><img src="../../../assets/images/user/QQ@2x.png" alt=""></a>
      <a href=""><img src="../../../assets/images/user/weibo@2x.png" alt=""></a>
    </div>
    <div class="description">
      注册/登录即代表同意
      <a href="">《中国县域用户使用协议》</a>
    </div>
  </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style lang="stylus" type="text/stylus">
  .sign
    position fixed
    bottom 0.68rem
    left 0
    width 100%
    color rgb(210,210,210)
    font-size 0.24rem
    .sign_title
      text-align center
    .sign_imgs
      margin-top 0.6rem
      text-align center
      a
        img
          width 0.58rem
          height 0.58rem
          border-radius 50%
          overflow hidden
          margin 0 0.34rem
    .description
      text-align center
      margin-top 0.9rem
      a
        color rgb(210,210,210)
        text-decoration underline
</style>
