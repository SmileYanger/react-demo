<template>
  <div class="recommend">
    <div class="title">
      推荐人才
    </div>
    <div v-for="(item, index) in data" :key="index">
      <div class="recommendItem"  @click="handleClickDetail(item.id)">
        <div class="title1">
          <div class="div">
            <span class="name">{{item.name}}</span>
          </div>
          <div class="money">
            {{item.gongzi}}
          </div>
        </div>
        <div class="label">
          <span class="sex">{{item.sex}}</span>
          <span class="age">{{item.age}}</span>
          <span class="education">{{item.xueli}}</span>
        </div>
        <div class="claim">
          <div>
            <span>期望职位：</span>
            <span>{{item.zhiwei}}</span>
          </div>
          <div class="time">{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      data: {
        type: Array
      }
    },
    methods: {
      handleClickDetail(id) {
        this.$emit('reloadView', id)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .recommend
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    .title
      margin 0.25rem 0 0 0.25rem
      font-size 0.36rem
      color rgb(51, 51, 51)
    .recommendItem
      margin 0.25rem 0.25rem 0 0.25rem
      padding-bottom 0.25rem
      border-bottom 1px solid rgb(238, 238, 238)
    .title1
      display flex
      justify-content space-between
      margin-top 0.1rem
      .div
        span
          display inline-block
          color rgb(133, 133, 133)
          font-size 0.24rem
          margin-right 5px
        .name
          font-size 0.32rem
          font-weight bold
          color rgb(51, 51, 51)
        .age
          height 0.24rem
          line-height 0.24rem
          padding-left 6px
          border-left 1px solid rgb(133, 133, 133)
        .work_year
          height 0.24rem
          line-height 0.24rem
          padding-left 6px
          border-left 1px solid rgb(133, 133, 133)
        .education
          height 0.24rem
          line-height 0.24rem
          padding-left 6px
          border-left 1px solid rgb(133, 133, 133)
      .money
        color rgb(250, 29, 0)
        font-size 0.24rem
    .label
      color rgb(88, 124, 172)
      font-size 0.2rem
      margin 0.2rem 0
      span
        display inline-block
        background-color rgb(244, 247, 251)
        padding 0.05rem 0.1rem
        margin-right 0.1rem
    .claim
      color rgb(133, 133, 133)
      font-size 0.28rem
      margin 0.1rem 0
      display flex
      justify-content space-between
</style>
