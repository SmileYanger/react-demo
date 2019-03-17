<template>
  <div class="page-navbar">

  <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">最新</mt-tab-item>
      <mt-tab-item id="3">附近</mt-tab-item>
    </mt-navbar>
 
  <!-- tabcontainer -->
    <mt-tab-container class="textList" v-model="selected">
      <mt-tab-container-item id="1">
        <!-- <mt-cell v-for="n in 3" :title="'内容 ' + n" /> -->
        <div class="item">
          <div class="item-left">
            <img src="">
          </div>
          <div class="item-right">
            <div class="top">
              <div class="title">
                  <div>法门寺景区11</div>
              <img src="../../assets/images/home/hot2.png"></div>
              <div class="read">6.6万浏览</div>
            </div>
            <div class="middle">
              <span class="time">09:00-21:00</span>
              <div>|</div>
              <span class="phone">029-87557512</span>
            </div>
            <div class="bottom">
              <span class="iconfont">&#xe611;</span>
              <span class="address">南环路法门镇</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <img src="">
          </div>
          <div class="item-right">
            <div class="top">
              <div class="title">法门寺景区<img src="../../assets/images/home/hot2.png"></div>
              <div class="read">6.6万浏览</div>
            </div>
            <div class="middle">
              <span class="time">09:00-21:00</span>
              <div>|</div>
              <span class="phone">029-87557512</span>
            </div>
            <div class="bottom">
              <span class="iconfont">&#xe611;</span>
              <span class="address">南环路法门镇</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="item">
          <div class="item-left">
            <img src="">
          </div>
          <div class="item-right">
            <div class="top">
              <div class="title">法门寺景区2222<img src="../../assets/images/home/hot2.png"></div>
              <div class="read">6.6万浏览</div>
            </div>
            <div class="middle">
              <span class="time">09:00-21:00</span>
              <div>|</div>
              <span class="phone">029-87557512</span>
            </div>
            <div class="bottom">
              <span class="iconfont">&#xe611;</span>
              <span class="address">南环路法门镇</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <img src="">
          </div>
          <div class="item-right">
            <div class="top">
              <div class="title">法门寺景区<img src="../../assets/images/home/hot2.png"></div>
              <div class="read">6.6万浏览</div>
            </div>
            <div class="middle">
              <span class="time">09:00-21:00</span>
              <div>|</div>
              <span class="phone">029-87557512</span>
            </div>
            <div class="bottom">
              <span class="iconfont">&#xe611;</span>
              <span class="address">南环路法门镇</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="item">
          <div class="item-left">
            <img src="">
          </div>
          <div class="item-right">
            <div class="top">
              <div class="title">法门寺景区3333<img src="../../assets/images/home/hot2.png"></div>
              <div class="read">6.6万浏览</div>
            </div>
            <div class="middle">
              <span class="time">09:00-21:00</span>
              <div>|</div>
              <span class="phone">029-87557512</span>
            </div>
            <div class="bottom">
              <span class="iconfont">&#xe611;</span>
              <span class="address">南环路法门镇</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <img src="">
          </div>
          <div class="item-right">
            <div class="top">
              <div class="title">法门寺景区<img src="../../assets/images/home/hot2.png"></div>
              <div class="read">6.6万浏览</div>
            </div>
            <div class="middle">
              <span class="time">09:00-21:00</span>
              <div>|</div>
              <span class="phone">029-87557512</span>
            </div>
            <div class="bottom">
              <span class="iconfont">&#xe611;</span>
              <span class="address">南环路法门镇</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>
 
<script>
export default {
  name: 'navbar',
 
  data() {
    return {
      selected: '1'
    };
  }
};
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl"
  .mint-navbar
    height 0.88rem
    border-bottom 1px solid #eee
    .mint-tab-item.is-selected
      border-bottom 3px solid #e81a00
      color #e81a00
      margin-bottom: 0.06rem
    .mint-tab-item
      font-size 0.28rem
      margin 0 0.8rem
      color #999
  .textList
    background-color: #FFF
    padding 0 0.25rem
  .item
    display flex
    padding 0.24rem 0
    border-bottom 1px solid #eee
    align-items center
    .item-left
      width 1.94rem
      height 1.50rem
      border 1px solid #ccc
      margin-right 0.3rem
      img
        width 1.94rem
        height 1.50rem
    .item-right
      flex 1
      .top
        display flex
        justify-content space-between
        align-items center
        .title
          font-size 0.32rem
          color #333
          display flex
          align-items center
          div
            ellipsis()
          img
            width 0.5rem
            height 0.28rem
            margin-left 0.1rem
        .read
          font-size 0.2rem
          color #999
      .middle
        font-size 0.22rem
        color #999
        display flex
        align-items center
        margin 0.1rem 0
        div
          margin 0 0.1rem
      .bottom
        font-size 0.24rem
        color #999
        .iconfont
          font-size 0.26rem
</style>

