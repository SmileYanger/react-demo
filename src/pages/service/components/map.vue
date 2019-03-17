<template>
  <div class="map">
    <div class="addressName">{{data.village}}</div>
    <div class="allmap" id="allmap" ref="allmap"></div>
  </div>
</template>

<script>
  import BMap from 'BMap'

  export default {
    name: "",
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      map() {
        var map = new BMap.Map('allmap')
        map.centerAndZoom(new BMap.Point(this.data.longs, this.data.lat), 14)
        map.enableScrollWheelZoom(true)
        var new_point = new BMap.Point(this.data.longs, this.data.lat);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
      }
    },
    mounted() {
      this.map()
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  .map
    border-bottom 0.2rem solid rgb(238, 238, 238)
    background: #fff
    padding 0.25rem
    .addressName
      font-size 0.3rem
      color rgb(51, 51, 51)
    .allmap
      margin-top 0.1rem
      height 2.76rem
</style>
