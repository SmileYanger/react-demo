<template>
  <div class="box">
    <div class="top">
      <i class="iconfont" @click="Goback">&#xe671;</i>
      <div class="search-bar"> 
          <i  class="iconfont ">&#xe6c6;</i>
           <input id="suggestId" v-model="mmaddress" type="search" placeholder="请输入您要搜索的地址" />
      </div>
      <span class="btn" id="go"  @click="search($event)">搜索</span>
    </div>
    <div class="map-wrap" style="position:relative" id="allmap"></div>
    <div class="item" >
      <p class="border-bottom" v-for='(item,index) in addressList' :key='index' @click="seachAddress(item.point.lng,item.point.lat,item.title)">
        {{item.title}}
      </p>
    </div>
  </div>
</template>

<script>
//  import Vue from 'vue'
// Vue.prototype.bus=new Vue()
 import BMap from 'BMap';
 export default {
    name: 'myMap',
    data() {
      return {
        lng:'',
        lat: '',
        map: '',
        mmaddress:'',
        addressList:[]
      }
    },
    mounted() {
      this.ready();
      let _this = this;
      //用于实现点击手机软键盘的搜索功能
//    document.getElementById('search_from').onsubmit = function(e){
//      _this.search(e);
//      document.activeElement.blur();//软键盘收起
//    }
    },
    beforeRouteLeave: (to, from, next) => {
        console.log(from.path)
         console.log(to.path)

        // if(from.path==''){

        // }
        // to.meta.keepAlive=true        
         next()
   },
    methods: {
      Goback(){
      this.$router.go(-1)
    },
      ready: function () {
        let _this = this;
        let point2;
        //获取经纬度
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            _this.lng = r.point.lng;
            _this.lat = r.point.lat;
            point2 = new BMap.Point(r.point.lng, r.point.lat);
            _this.getLocalName(point2);
          }
          else {
            alert('failed' + this.getStatus());
          }
        }, {enableHighAccuracy: true});


        //加载地图到allmap和添加地图插件
        var map = new BMap.Map('allmap');
        this.map = map;
        var point = new BMap.Point(_this.lng, _this.lat);

        map.centerAndZoom(point, 17); //这个数字是放大缩小地图用的
        map.addControl(new BMap.MapTypeControl());
        let ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);

        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
        console.log(marker)
      },

      getLocalName: function (point2) {
        let gc = new BMap.Geocoder();
        let that = this
        gc.getLocation(point2, function (rs) {
          let addComp = rs.addressComponents;
          that.map.enableScrollWheelZoom();
          that.map.centerAndZoom(point2, 16);
        });
      },
 search: function (event) {
        var myValue;
        var that = this;
        console.log(event.which);
        if(this.mmaddress==''){return;}
        that.addressList = [];
          document.activeElement.blur();
//        base.msg.loader();
          var city = this.mmaddress;
          var options = {
            onSearchComplete: function (results) {
              // 判断状态是否正确
              if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                console.log(results.getPoi(0)); 
                for (var i = 0; i < results.getCurrentNumPois(); i++) {
                  that.addressList.push(results.getPoi(i));
                }
                myValue = results.getPoi(0).address + results.getPoi(0).title;
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                that.map.centerAndZoom(pp, 16);
                //setPlace();
//              base.msg.hide();
              }
            }
          };
          var local = new BMap.LocalSearch(that.map, options);
          local.search(city);
      },
      seachAddress(lng,lat,address){
        let point2 = new BMap.Point(lng,lat);
        this.getLocalName(point2);
        console.log(lng,lat,address)
        this.bus.$emit('',lng,lat,address)
        // this.$emit('getAddress', lng,lat,address)
        this.$router.go(-1)
      }
   },
}

</script>

<style lang="stylus" scoped>
.box   
    .top
      padding .48rem .35rem .2rem
      font-size .32rem
      color #000
      position relative
      text-align center
      letterSpaceing()
      height .6rem
      display flex 
      background #f6f6f6      
      .iconfont
        line-height .6rem
      .search-bar
        height .6rem
        background green
        float right
        flex 1
        margin-left .2rem
        border-radius .3rem
        background white
        font-size 0
        .iconfont
          line-height .6rem 
        input
          height .6rem
          font-size .24rem
          letterSpaceing()
          padding-left .1rem
          width 86%
          outline none   
          vertical-align top
          letter-spacing 1px
          color #666
          &::-webkit-input-placeholder 
            color rgb(153,153,153)
            font-size .26rem
          &:-moz-placeholder 
            color rgb(153,153,153)
            font-size .26rem
          &::-moz-placeholder 
            color rgb(153,153,153)
            font-size .26rem
          &:-ms-input-placeholder  
            color rgb(153,153,153)
            font-size .26rem 
      .btn
        line-height .6rem
        padding-left .2rem
        font-size .26rem
        color rgb(102, 102, 102)
  .map-wrap
    width 100%
    height 300px
  .item
    padding .3rem .25rem
    box-sizing border-box 
    p
      line-height .6rem
</style>