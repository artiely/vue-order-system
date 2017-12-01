import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Shop from '@/components/Shop'
import Order from '@/components/Order'
import User from '@/components/User'
import store from '.././store/index'
import i18n from '@/i18n'
import {Toast} from 'mint-ui'

Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Router.prototype.back = function () {
  this.isBack = true
  window.history.go(-1)
}
// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  store.commit('LOGIN', {
    userId: Number(window.sessionStorage.getItem('token')),
    personId: Number(window.sessionStorage.getItem('personId'))
  })
}
if (window.sessionStorage.getItem('person')) {
  store.commit('PERSON_INFO', window.sessionStorage.getItem('person'))
}

// const Order = resolve => {
//   let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
//   require(['@/components/Order'], (component) => {
//     resolve(component)
//     instance.close();
//   })
// }
// const User = resolve => {
//   let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
//   require(['@/components/User'], (component) => {
//     resolve(component)
//     instance.close();
//   })
// }
const Ma = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Ma'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Oncall = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Oncall'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}
const Balance = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Balance'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}
const Complain = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Complain'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}
const Address = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Address'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}
const Urge = resolve => {
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  require(['@/components/Urge'], (component) => {
    // Indicator.close();
    resolve(component)
    // Indicator.close();
  })
}
const Orderdetail = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  require(['@/components/items/Orderdetail'], (component) => {
    // Indicator.close();
    resolve(component)
  })
}

const Pay = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Pay'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Register = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Register'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Type = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Type'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Join = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Join'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Reject = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Reject'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Info = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Info'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Payok = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Payok'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Record = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Record'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Coupons = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Coupons'], (component) => {
    // Indicator.close();
    resolve(component)
    // instance.close();
  })
}

const Fpassword = resolve => {
  // Indicator.open({
  //   text: '载入中...',
  //   spinnerType: 'fading-circle'
  // });
  // let instance = Toast({duration:-1,message:'载入中...',iconClass:'iconfont icon-loading2 icon-rock'});
  require(['@/components/Fpassword'], (component) => {
    resolve(component)
    // Indicator.close();
    // instance.close();
  })
}

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
      component: Index,
      // meta: {requiresAuth: true},
    },
      {
        path: '/shop',
        name: 'shop',
        component: Shop,
        // meta: {requiresAuth: true},
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
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {requiresAuth: true},
    component: Pay
  },
  {
    path: '/register',
    name: 'register',
    meta: {requiresAuth: false},
    component: Register
  },
  {
    path: '/type',
    name: 'type',
    meta: {requiresAuth: false},
    component: Type
  },
  {
    path: '/join',
    name: 'join',
    meta: {requiresAuth: false},
    component: Join
  },
  {
    path: '/reject',
    name: 'reject',
    meta: {requiresAuth: false},
    component: Reject
  },
  {
    path: '/info',
    name: 'info',
    meta: {requiresAuth: true},
    component: Info
  },
  {
    path: '/payok',
    name: 'payok',
    meta: {requiresAuth: false},
    component: Payok
  },
  {
    path: '/record',
    name: 'Record',
    meta: {requiresAuth: false},
    component: Record
  },
  {
    path: '/coupons',
    name: 'Coupons',
    meta: {requiresAuth: false},
    component: Coupons
  },
  {
    path: '/f_password',
    name: 'f_password',
    meta: {requiresAuth: false},
    component: Fpassword
  }
]

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  //url传过来的k缓存openId
  let openId = to.query.openId;
  if (openId) {
    window.localStorage.setItem("openId", openId);
  }
  // 语言
  let lang = window.localStorage.getItem('lang')
  if (!lang) {
    lang = 'CN'
  }
  i18n.locale = lang
  console.log('当前语言*', lang)
  store.commit('SET_LANG', lang)
  /**
   * 路由切换前先给state赋值
   */

    // let token = Cookies.get('token')
  let token = sessionStorage.getItem('token')
  console.log('session-token', token)
console.log('******************',sessionStorage.getItem('isGuest'))
  if (sessionStorage.getItem('isGuest') && sessionStorage.getItem('isGuest') == 'true') {
    store.commit('IS_GUEST', true)
  }else{
    store.commit('IS_GUEST', false)
  }

  if (to.meta.requiresAuth) {
    if (token != null && token != undefined) {
      next({query: {redirect: to.fullPath}})
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
