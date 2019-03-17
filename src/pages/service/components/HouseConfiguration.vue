<template>
  <div class="HouseConfiguration">
    <div class="house_configuration">房屋配置</div>
    <div class="configuration">
      <div v-for="(item, index) in data.configure">
        <div class="isTrue" v-if="item.status === 1">
          <img src="../../../assets/images/fuwu/duihao_Selected.png" alt="">
          <span>{{item.name}}</span>
        </div>
        <div class="isFalse" v-else>
          <img src="../../../assets/images/fuwu/duihao_Default.png" alt="">
          <span>{{item.name}}</span>
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
  .HouseConfiguration
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    .house_configuration
      font-size 0.3rem
      color rgb(51, 51, 51)
      font-weight bold
      margin 0.3rem 0.25rem
    .configuration
      display flex
      justify-content space-around
      flex-wrap wrap
      font-size 0.24rem
      .isTrue
        color rgb(51, 51, 51)
        margin-bottom 0.4rem
        img
          width 18px
          height 18px
      .isFalse
        color rgb(210, 210, 210)
        margin-bottom 0.4rem
        img
          width 18px
          height 18px
</style>
