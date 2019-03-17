<template>
  <div>
    <!-- navbar -->
    <div class="nav">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item :id="1">圈子状态</mt-tab-item>
        <mt-tab-item :id="2">信息发布</mt-tab-item>
      </mt-navbar>
      <div class="iconfont" @click="$router.go(-1)">&#xe671;</div>
    </div>
    <!-- tabcontainer -->
    <mt-tab-container class="view" v-model="selected">
      <mt-tab-container-item :id="1">
        <div v-for="(item, index) in list" :key="index">
          <circle-status :data="item" @reloadView="reloadCircle"></circle-status>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item :id="2">
        <div v-for="(item, index) in lists" :key="index">
          <!--<message-release :item="item"></message-release>-->
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import messageRelease from '../components/messageRelease'
  import circleStatus from '../components/circleStatus'

  export default {
    name: "",
    components: {
      messageRelease,
      circleStatus
    },
    data() {
      return {
        title: '我的发布',
        selected: 1,
        list: [],
        lists: [{id: 3}, {id: 2}, {id: 1}, {id: 3}, {id: 2}, {id: 1}]
      }
    },
    methods: {
      getMyRelease() {
        this.$axios({
          method: 'post',
          data: {
            do: 'my_quan',
            page: '1',
            openid: this.$store.state.openid,
            weid:this.$store.state.weid
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.list = res.data.datas
          }
        })
      },
      reloadCircle() {
        this.getMyRelease()
      }
    },
    mounted() {
      this.getMyRelease()
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .nav
    width 100%
    height 1.28rem
    position fixed
    top 0
    left 0
    z-index 222
    border-bottom 1px solid #eaeaea
    background #f6f6f6
    .iconfont
      position absolute
      left 0.25rem
      top 0.64rem
    .page-part
      padding 5px
      display flex
      justify-content space-between
      height 0.88rem
      width 40%
      background #f6f6f6
      margin 0.2rem auto
      .mint-tab-item
        margin 0 4%
        color rgb(102, 102, 102)
      .mint-tab-item.is-selected
        border-bottom 3px solid #e81a00
        color rgb(51, 51, 51)
        font-weight bold

  .view
    margin-top 1.29rem
</style>
