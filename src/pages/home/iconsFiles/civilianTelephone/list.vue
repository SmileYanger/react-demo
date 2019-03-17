<template>
    <!-- 列表 -->
    <ul class="phone-list">
        <li class="list-item border-bottom" >
            <div class="list-left">
                <h3 >{{item.title}}</h3>
                <p class="number">{{item.tel}}</p>
                <p class="address"> 
                    <!-- <span class="mi"> 524米</span> -->
                    <!-- <i class="line">|</i> -->
                    <i class="iconfont"> &#xe611; </i>
                    <span class="addressDesc" @click="goMap(item.address)">{{item.address}}</span>
                </p>
               
            </div>
            <img src="../../../../assets/images/phone.png" @click="phoneCall(item.tel)">
        </li>  
    </ul>
</template>

<script>   

export default {

  name: 'PhoneList',
  props:{
    item:Object
  },
  data () {
    return {
    }
  },
  methods:{
    goMap(address){
        console.log(address)
        this.$router.push({path:'./mymap',query: {address:address} })
    },
    phoneCall(number){  //拨打电话
        console.log(number)
        window.location.href="tel:number"
    },
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
@import "~styles/varibles.styl"
.phone-list
    padding 0 .25rem
    background white
    .list-item
        padding 0.36rem 0
        height 1.88rem
        display flex
        align-items center
        box-sizing border-box
        .list-left
            flex 1
            overflow hidden
        h3
            font-size .32rem
            color darkTextColor
            ellipsis()               
        .address
            font-size .26rem
            color #999           
            display flex
            .mi
                min-width .7rem
            .line
                color #999
                margin 0 .2rem
            .iconfont
                margin-right .1rem
                font-size .26rem
            .addressDesc
                 ellipsis()
        .number
                font-size .24rem
                color #999
                padding .1rem 0
        img
            width 0.68rem
            height 0.68rem 
            margin-left .2rem
</style>