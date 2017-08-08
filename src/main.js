// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
// import 'muse-components/styles/base.less' // 加载基础的样式 muse-ui/src
// import DatePicker from 'muse-components/datePicker'
// Vue.component('date-picker', DatePicker)

import 'mint-ui/lib/style.css'
import '../statics/mobile/font/iconfont.css'
import './assets/style/main.less'
import i18n from './i18n/index'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import App from './App.vue'

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


import ButtonBar from './components/items/Btnbar.vue'
Vue.component('button-bar', ButtonBar)

Vue.use(MintUI)

import StarRating from 'vue-star-rating'
Vue.component('star-rating', StarRating);

import {
  cutTime
} from './directive/index'

Vue.config.productionTip = false;

import store from './store/index'

import api from './api'
Vue.use(api)
import './api/config'
console.log("ERROR", ERR_OK)

import {
  Indicator
} from 'mint-ui';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
});

setInterval(function () {
  var x = navigator.onLine;
  if (!x) {
    Indicator.open({
      text: '网络断开连接...',
      spinnerType: 'fading-circle'
    });
  } else {
    Indicator.close()
  }
}, 1500);
