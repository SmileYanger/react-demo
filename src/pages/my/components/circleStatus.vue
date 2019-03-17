<template>
  <div class="circleStatus" v-if="data.body !== ''">
    <span class="time">
      {{data.survey_time}}
    </span>
    <div class="item">
      <p>{{data.body}}</p>
      <div>
        <span class="releaseTime">
          {{data.time}}
          <span class="delete" @click="deleteCirle(data.id)">删除</span>
         </span>
        <span v-if="data.yuedu != '0'">{{data.yuedu}}浏览</span>
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
    },
    methods: {
      deleteCirle(id) {
        this.getDelete(id)
      },
      getDelete(id) {
        this.$axios({
          method: 'post',
          data: {
            do: 'my_quan_delete',
            id: id
          }
        }).then(res => {
          this.$emit('reloadView')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .circleStatus
    background #f6f6f6
    text-align center
    .time
      display inline-block
      height 0.38rem
      line-height 0.38rem
      padding 0.05rem 0.1rem
      background rgb(221, 221, 221)
      font-size 0.24rem
      color #f6f6f6
      margin 0.28rem auto
      border-radius 0.1rem
    .item
      background #ffffff
      padding 0.2rem
      p
        text-align left
        font-size 0.3rem
        color rgb(51, 51, 51)
      div
        margin-top 0.15rem
        display flex
        justify-content space-between
        color rgb(178, 178, 178)
        font-size 0.24rem
        .delete
          color rgb(80, 129, 195)
          margin-left 0.2rem
</style>
