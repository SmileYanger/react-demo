// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http.js'
// 解决移动端300ms延迟
import fastClick from 'fastclick'
// 重置样式表
import 'styles/reset.css'
// 解决一象素边框
import 'styles/border.css'
// iconfont
import 'styles/iconfont.css'
// es6->es5
import 'babel-polyfill'
import store from'./store/index.js'
// 移动端UI组件（mint-ui@2.2.13）
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

import LyTab from 'ly-tab'

// 引入更改的mint-ui控件样式
import '../static/css/mint-ui.scss'

let Base64 = require('js-base64').Base64;

// 过滤器
import filters from '@/assets/js/filter.js'

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.filter("ellpers", value => {
    if (!value) return ''      
      if (value.length > 8) {       
      return value.slice(0,8) + '...'      
      }     
    return value
})


Vue.use(Mint);
Vue.use(LyTab);
import { CheckIcon,XTextarea,Datetime, Group,Tab,TabItem,Swiper,SwiperItem} from 'vux'

Vue.component('check-icon', CheckIcon,)
Vue.component('x-textarea', XTextarea,)
Vue.component('datetime', Datetime)
Vue.component('group', Group)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)



Vue.config.productionTip = false
// fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
