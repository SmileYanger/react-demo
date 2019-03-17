<template>
  <div id="app">
	<!-- 	<keep-alive include="CarpoolCenter,Company,HouseRentals,HouseSale,JobHunting,publiclist,hoemsearch,searchlist,Search,HotEnter">
  			<router-view/> 
  	</keep-alive>  -->

  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> 
    <router-view ></router-view> --> 


  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >

* {
	-webkit-touch-callout:none;
	-webkit-user-select:none;
	-khtml-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none;
 }
 .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
}
.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}
.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}
.page-loadmore-wrapper {
    overflow: scroll
}
.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}
.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
</style>
