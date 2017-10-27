import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/font/iconfont.css'
import './assets/style/main.less'
import i18n from './i18n/index'
import store from './store/index'
import api from './api'
import './api/config'
import {Indicator} from 'mint-ui';
import datePicker from 'muse-components/datePicker'
import textField from 'muse-components/textField'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ButtonBar from './components/items/Btnbar.vue'
import VueScroller from 'vue-scroller'
import StarRating from 'vue-star-rating'
import App from './App.vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// import vConsole from 'vconsole'

Vue.component('mu-date-picker', datePicker)
Vue.component('mu-text-field', textField)
Vue.component('button-bar', ButtonBar)
Vue.component('star-rating', StarRating);
Vue.use(VueAwesomeSwiper)
Vue.use(VueScroller)
Vue.use(MintUI)
Vue.use(api)

Vue.config.productionTip = false;

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
