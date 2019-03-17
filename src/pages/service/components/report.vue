<template>
  <div class="report">
    <div class="left">
      <div class="top">如果您认为此条信息存在</div>
      <div>无效、虚假、咋骗信息，请立刻举报</div>
    </div>
    <div class="right" @click="handleReport">
      举报
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
      }
    },
    methods: {
      handleReport() {
        this.$axios({
          method: 'post',
          data: {
            do: 'report',
            act: 'report',
            weid: this.$store.state.weid,
            type: this.type,
            id: this.id,
            openid: this.$store.state.openid
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code == '401' || res.data.code == '402') {
            this.$router.push('./login')
          } else {
            this.$messagebox.alert(res.data.msg).then(action => {
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .report
    display flex
    justify-content space-between
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    .left
      margin 0.3rem 0.25rem
      font-size 0.24rem
      color rgb(88, 124, 172)
      .top
        color rgb(133, 133, 133)
    .right
      width 1.03rem
      height 0.5rem
      font-size 0.26rem
      color rgb(255, 119, 59)
      line-height 0.5rem
      border 1px solid rgb(225, 171, 142)
      text-align center
      margin-top 0.4rem
      margin-right 0.25rem
      border-radius 4px
</style>
