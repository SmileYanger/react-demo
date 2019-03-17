<template>
  <div class="newsRelease">
    <div class="item" @click="handleChangeMessage">
      <img src="../../../assets/images/user/message.png" alt="">
      <div>我的消息</div>
      <div v-if="bool" class="news"></div>
    </div>
    <div class="item" @click="handleChangeRelease">
      <img src="../../../assets/images/user/fabu.png" alt="">
      <div>我的发布</div>
    </div>
    <div class="item"  @click="handleChangeActivities">
      <img src="../../../assets/images/user/huodong.png" alt="">
      <div>我的活动</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return {
        bool: ''
      }
    },
    props: {
      id: {
        type: String
      },
    },
    mounted(){
      this.getNewMessage()
    },
    methods: {
      handleChangeMessage() {

        this.$router.push('./myMessage')
      },
      handleChangeRelease() {
        this.$router.push('./myRelease')
      },
      handleChangeActivities() {
        this.$router.push('./myActivities')
      },
      getNewMessage() {
        this.$axios({
          method: 'post',
          data: {
            do:'message',
            act:'bub',
            openid: this.id
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.bool = true
          } else {
            this.bool = false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .newsRelease
    display flex
    justify-content space-around
    height 1.48rem
    background-color #fff
    .item
      text-align center
      margin 0.2rem 0.3rem
      position relative
      img
        width 0.5rem
        margin 0.15rem 0
      div
        font-size 0.28rem
        color rgb(51, 51, 51)
      .news
        width 10px
        height 10px
        border-radius 50%
        background-color red
        position absolute
        top 5px
        right 15px
</style>
