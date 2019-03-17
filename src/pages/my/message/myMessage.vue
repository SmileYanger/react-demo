<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div style="padding-top: 1.29rem">
      <!-- navbar -->
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item :id="1">回复消息</mt-tab-item>
        <mt-tab-item :id="2">系统通知</mt-tab-item>
      </mt-navbar>

      <!-- tabcontainer -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <div v-for="(item, index) in list" :key="index">
            <reply :data="item"></reply>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <div v-for="(item, index) in sysList" :key="index">
            <system-notification :data="item"></system-notification>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import HeaderBar from 'common/headerbar.vue'
  import SystemNotification from '../components/systemNotification'
  import Reply from '../components/reply'

  export default {
    name: "",
    components: {
      HeaderBar,
      SystemNotification,
      Reply
    },
    data() {
      return {
        title: '消息通知',
        selected: 1,
        list: [],
        sysList: []
      }
    },
    methods: {
      getMyMessage() {
        this.$axios({
          method: 'post',
          data: {
            do: 'message',
            act: 'reply',
            openid: this.$store.state.openid
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.list = res.data.datas
          }
        })
      },
      getMessage() {
        this.$axios({
          method: 'post',
          data: {
            do: 'message',
            act: 'sys',
            page: '1'
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.sysList = res.data.datas
          }
        })
      }
    },
    mounted() {
      this.getMyMessage()
      this.getMessage()
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .page-part
    padding 5px
    display flex
    justify-content space-between
    border-bottom 1px solid #eaeaea
    height 0.88rem
    .mint-tab-item
      margin 0 17%
      color #999
    .mint-tab-item.is-selected
      border-bottom 3px solid #e81a00
      color #e81a00
</style>
