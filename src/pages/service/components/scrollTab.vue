<template>
  <div class="scrollView">
    <LyTab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange">
    </LyTab>
    <component :is="changeList"></component>
  </div>
</template>

<script>
  import latesRelease from '../lists/latestRelease'
  import houseSale from '../lists/houseSale'
  import houseRent from '../lists/houseRent'
  import recruitment from '../lists/recruitment'
  import job from '../lists/job'
  import transaction from '../lists/transaction'
  import secondHand from '../lists/secondHand'
  import carpoolCenter from '../lists/carpoolCenter'

  export default {
    name: 'scrollView',
    components: {
      latesRelease,
      houseSale,
      houseRent,
      recruitment,
      job,
      transaction,
      secondHand,
      carpoolCenter
    },
    data() {
      return {
        selectedId: 0,
        bottomSelectedId: 0,
        items: [
          // {label: '最新发布'},
          {label: '房屋出售'},
          {label: '房屋出租'},
          {label: '企业招聘'},
          {label: '个人求职'},
          {label: '车辆交易'},
          {label: '二手物品'},
          {label: '拼车中心'}
        ],
        options: {
          activeColor: 'rgb(232,26,0)'
        },

        index: 0,
        arr: ['houseSale', 'houseRent', 'recruitment', 'job', 'transaction', 'secondHand', 'carpoolCenter']
      }
    },
    methods: {
      handleChange(item, index) {
        this.index = index
      }
    },
    computed: {
      changeList() {
        return this.arr[this.index]
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .ly-tab
    background-color #f9f9f9 !important
    border none !important
    padding 0.1rem 0 !important
    .ly-tab-item
      font-size 0.28rem
      color rgb(133, 133, 133)
</style>
