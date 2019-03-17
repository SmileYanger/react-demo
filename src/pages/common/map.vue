<template>
 <div class="box">
     <div class="title border-bottom">
        <i class="iconfont" @click="Goback">&#xe671;</i>
       地图
    </div>
    <div class="allmap" id="allmap" ref="allmap"></div>
 </div>
</template>

<script>
 import BMap from 'BMap'
export default {

  name: 'headerbar',
  props:{
  	title:{
  		type:String
  	}
  },
  data () {
    return {
      city:this.$route.query.address
    }
  },
  methods:{
  	 Goback(){
      this.$router.go(-1)
    },
     map: function() {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        console.log(point)
        map.centerAndZoom(point,12);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(this.city, function(point){
          if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
          }else{
            alert("您选择地址没有解析到结果!");
          }
        });
      }
  },
  mounted(){
    this.map()
   }
}
</script>

<style lang="stylus" scoped>
.box
  overflow-y none
  overflow hidden
  .title
      padding .6rem .35rem .2rem
      background rgb(247, 246, 246)
      font-size .32rem
      color #000
      position relative
      text-align center
      letter-spacing 1px
      .iconfont
        width value
        position absolute
        left .35rem
        color #666
  .allmap
    width 100%
    height 700px
    
</style>