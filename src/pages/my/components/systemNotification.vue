<template>
  <div>
    <div class="systemNotification">
      <img :src="data.thumb | url" alt="">
      <div class="notificationContent">
        <div class="notificationTitle">
          <span class="message_title">{{data.title}}</span>
          <span class="notificationTime">{{data.time}}</span>
        </div>
        <div class="details">{{data.body}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "",
    props: {
      data: {
        type: Object
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"

  .systemNotification
    display flex
    justify-content space-between
    padding 0.3rem 0.2rem
    border-bottom 1px solid #f6f6f6
    /*height 1.34rem*/
    img
      width 0.8rem
      height 0.8rem
      margin-right 0.2rem
    .notificationContent
      width calc(100% - 1rem)
      .notificationTitle
        display flex
        justify-content space-between
        .message_title
          font-size 0.3rem
          color #333
        .notificationTime
          font-size 0.2rem
          color #999
      .details
        margin-top 0.1rem
        color #999
        font-size 0.24rem
        ellipsis()
</style>
