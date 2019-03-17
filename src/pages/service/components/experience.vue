<template>
  <div class="experience">
    <div class="title">工作经历</div>
    <div class="experienceItem" v-for="(item, index) in data.work">
      <div class="name">
        {{item.company}}
      </div>
      <div class="claim">
        <div>
          <span>在职职位：</span>
          <span style="color: rgb(51,51,51)">{{item.major}}</span>
        </div>
        <div class="iconfont">&#xe666;</div>
      </div>
      <div class="claim">
        <div>
          <span>在职时间：</span>
          <span style="color: rgb(51,51,51)">{{item.jointime}}——{{item.finishitime}}</span>
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
        type: Object
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .experience
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    .title
      margin 0.25rem 0.25rem 0
      font-size 0.36rem
      color rgb(51, 51, 51)
    .experienceItem
      margin-left 0.25rem
      padding 0.2rem 0
      border-bottom 1px solid rgb(238, 238, 238)
      .name
        font-size 0.3rem
        font-weight bold
        color rgb(51, 51, 51)
      .claim
        color rgb(133, 133, 133)
        font-size 0.28rem
        margin 0.1rem 0.25rem 0.1rem 0
        display flex
        justify-content space-between
</style>
