<template>
  <div class="educationExperience">
    <div class="title">
      教育经历
    </div>
    <div class="experienceItem">
      <div class="school">
        <span>{{data.school_name}}</span>
        <span class="profession">{{data.school_major}}</span>
      </div>
      <div class="claim">
        <span>毕业时间：</span>
        <span style="color: rgb(51,51,51)">{{data.jointime}}——{{data.finishitime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      data: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .educationExperience
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    .title
      margin 0.25rem
      font-size 0.36rem
      color rgb(51, 51, 51)
    .experienceItem
      margin-left 0.25rem
      padding-bottom 0.2rem
      border-bottom 1px solid rgb(238, 238, 238)
      .school
        font-size 0.26rem
        font-weight bold
        color rgb(51, 51, 51)
        .profession
          color rgb(133, 133, 133)
          font-size 0.26rem
          font-weight 400
          display inline-block
          margin-left 8px
          padding-left 8px
          border-left 1px solid rgb(133, 133, 133)
      .claim
        color rgb(133, 133, 133)
        font-size 0.28rem
        margin 0.1rem 0.25rem 0.1rem 0
</style>
