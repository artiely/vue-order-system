import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Shop from '@/components/Shop'
import store from '.././store/index'
import i18n from '@/i18n'
Vue.use(Router);

Router.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1)
}
Router.prototype.back = function () {
  this.isBack = true;
  window.history.go(-1)
}
// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  // alert(window.sessionStorage.getItem('token'))
  store.commit('LOGIN', {userId: Number(window.sessionStorage.getItem('token'))})
}
if (window.sessionStorage.getItem('person')) {
  store.commit('PERSON_INFO', window.sessionStorage.getItem('person'))
}
import {Indicator} from 'mint-ui';
const Order = resolve => {
  Indicator.open();
  require.ensure(['@/components/Order'], () => {
    resolve(require('@/components/Order'));
    Indicator.close()
  })
};
const User = resolve => {
  Indicator.open();
  require.ensure(['@/components/User'], () => {
    resolve(require('@/components/User'));
    Indicator.close()
  })
};
const Ma = resolve => {
  Indicator.open();
  require.ensure(['@/components/Ma'], () => {
    resolve(require('@/components/Ma'));
    Indicator.close()
  })
};
const Oncall = resolve => {
  Indicator.open();
  require.ensure(['@/components/Oncall'], () => {
    resolve(require('@/components/Oncall'));
    Indicator.close()
  })
};
const Balance = resolve => {
  Indicator.open();
  require.ensure(['@/components/Balance'], () => {
    resolve(require('@/components/Balance'));
    Indicator.close()
  })
};
const Complain = resolve => {
  Indicator.open();
  require.ensure(['@/components/Complain'], () => {
    resolve(require('@/components/Complain'));
    Indicator.close()
  })
};
const Address = resolve => {
  Indicator.open();
  require.ensure(['@/components/Address'], () => {
    resolve(require('@/components/Address'));
    Indicator.close()
  })
};
const Urge = resolve => {
  Indicator.open();
  require.ensure(['@/components/Urge'], () => {
    resolve(require('@/components/Urge'));
    Indicator.close()
  })
};
const Orderdetail = resolve => {
  Indicator.open();
  require.ensure(['@/components/items/Orderdetail'], () => {
    resolve(require('@/components/items/Orderdetail'));
    Indicator.close()
  })
};

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
  {
    path: '/',
    component: Home,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'index',
      component: Index
    },
      {
        path: '/shop',
        name: 'shop',
        component: Shop
      },
      {
        path: '/order',
        name: 'order',
        meta: {requiresAuth: true},
        component: Order
      },
      {
        path: '/user',
        name: 'user',
        meta: {requiresAuth: true},
        component: User
      }
    ]
  }, {
    path: '/ma',
    name: 'ma',
    meta: {requiresAuth: true},
    component: Ma
  },
  {
    path: '/oncall',
    name: 'oncall',
    meta: {requiresAuth: true},
    component: Oncall
  }, {
    path: '/balance',
    name: 'balance',
    meta: {requiresAuth: true},
    component: Balance
  },
  {
    path: '/complain',
    name: 'complain',
    meta: {requiresAuth: true},
    component: Complain
  },
  {
    path: '/address',
    name: 'address',
    meta: {requiresAuth: true},
    component: Address
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    meta: {requiresAuth: true},
    component: Orderdetail
  },
  {
    path: '/urge',
    name: 'urge',
    meta: {requiresAuth: true},
    component: Urge
  }
];

const router = new Router({
  routes
});
router.beforeEach((to, from, next) => {
  // 语言
  let lang = window.localStorage.getItem('lang')
  if (lang) {
    i18n.locale = lang
    console.log(store)
    store.commit('SET_LANG',lang)
  }

  if (to.meta.requiresAuth) {
    if (store.state.userInfo.token != null && store.state.userInfo.token != undefined) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next()
  }
});

export default router;
