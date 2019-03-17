<template>
  <div class="scrollView">
    <LyTab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange">
    </LyTab>
  </div>
</template>

<script>

  export default {
    name: 'scrollTab',
    data() {
      return {
        selectedId: 0,
        bottomSelectedId: 0,
        items: [
          {label: '最新发布'},
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
      }
    },
    methods: {
      handleChange(item, index) {
        this.$emit('child-event', index)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .ly-tab
    background-color rgb(242,242,242) !important
    .ly-tab-item
      font-size 0.28rem
      color rgb(133, 133, 133)
</style>
