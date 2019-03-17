<template>
  <div class="footView">
    <div class="star" v-if="isshoucang == '0'" @click="handleShouchang">
      <i class="iconfont">&#xe60a;</i>
      <div></div>收藏
    </div>
    <div class="star1" v-if="isshoucang == '1'" @click="handleShouchang">
      <i class="iconfont">&#xe60a;</i>
      <div></div>已收藏
    </div>
    <div class="star">
      <i class="iconfont">&#xe600;</i>
      <div></div>分享
    </div>
    <div class="call_phone" @click="callPhone(phone)">
      <img class="phone" src="../../../assets/images/fuwu/dianhua.png" alt="">
      <span>拨打电话</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      type: {
        type: Number
      },
      id: {
        type: String
      },
      phone: {
        type: String
      },
      isshoucang: {
        type: Number
      }
    },
    methods: {
      handleShouchang() {
        this.$axios({
          method: 'post',
          data: {
            do: 'shoucang',
            act: 'xinxi',
            weid: this.$store.state.weid,
            type: this.type,
            id: this.id,
            openid: this.$store.state.openid
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code == '200') {
            this.$emit('reloadView')
          }
          if (res.data.code == '401' || res.data.code == '402') {
              this.$router.push('./login')
          }
        })
      },
      callPhone(phone) {
        console.log(phone)
        window.location.href="tel:phone"
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" spoced>
  .footView
    position fixed
    bottom 0
    left 0
    display flex
    justify-content space-around
    height 1.1rem
    width 100%
    background #fff
    box-shadow 0 -1px 20px rgb(238, 238, 238)
    div
      text-align center
      font-size 0.2rem
    .star
      position relative
      color rgb(72, 74, 86)
      top 0.1rem
    .star1
      position relative
      top 0.1rem
      color red
    .call_phone
      width 4.9rem
      height 0.83rem
      line-height 0.83rem
      background dodgerblue
      color #fff
      margin-top 0.15rem
      border-radius 5px
      font-size 0.3rem
      .phone
        width 0.45rem
        height 0.45rem
</style>
