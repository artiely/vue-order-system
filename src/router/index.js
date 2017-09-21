import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Shop from '@/components/Shop'
import store from '.././store/index'
import i18n from '@/i18n'
// import Cookies from 'js-cookie'
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
import { Indicator } from 'mint-ui'
const Order = resolve => {
  Indicator.open()
  require.ensure(['@/components/Order'], () => {
    resolve(require('@/components/Order'))
  }).then(()=>{Indicator.close()})
}
const User = resolve => {
  Indicator.open()
  require.ensure(['@/components/User'], () => {
    resolve(require('@/components/User'))
  }).then(()=>{Indicator.close()})
}
const Ma = resolve => {
  Indicator.open({
    text: '加载...',
    spinnerType: 'fading-circle'
  });
  require.ensure(['@/components/Ma'], () => {
    resolve(require('@/components/Ma'))
  })
    .then(()=>{
    // console.log(123)
    Indicator.close()})
}
const Oncall = resolve => {
  Indicator.open()
  require.ensure(['@/components/Oncall'], () => {
    resolve(require('@/components/Oncall'))
  }).then(()=>{Indicator.close()})
}
const Balance = resolve => {
  Indicator.open()
  require.ensure(['@/components/Balance'], () => {
    resolve(require('@/components/Balance'))
  }).then(()=>{Indicator.close()})
}
const Complain = resolve => {
  Indicator.open()
  require.ensure(['@/components/Complain'], () => {
    resolve(require('@/components/Complain'))
  }).then(()=>{Indicator.close()})
}
const Address = resolve => {
  Indicator.open()
  require.ensure(['@/components/Address'], () => {
    resolve(require('@/components/Address'))
  }).then(()=>{Indicator.close()})
}
const Urge = resolve => {
  Indicator.open()
  require.ensure(['@/components/Urge'], () => {
    resolve(require('@/components/Urge'))
  }).then(()=>{Indicator.close()})
}
const Orderdetail = resolve => {
  Indicator.open()
  require.ensure(['@/components/items/Orderdetail'], () => {
    resolve(require('@/components/items/Orderdetail'))
  }).then(()=>{Indicator.close()})
}

const Pay = resolve => {
  Indicator.open()
  require.ensure(['@/components/Pay'], () => {
    resolve(require('@/components/Pay'))
  }).then(()=>{Indicator.close()})
}

const Register = resolve => {
  Indicator.open()
  require.ensure(['@/components/Register'], () => {
    resolve(require('@/components/Register'))
  }).then(()=>{Indicator.close()})
}
// const Register2 = resolve => {
//   Indicator.open()
//   require.ensure(['@/components/Register2'], () => {
//     resolve(require('@/components/Register2'))
//   }).then(()=>{Indicator.close()})
// }

const Type = resolve => {
  Indicator.open()
  require.ensure(['@/components/Type'], () => {
    resolve(require('@/components/Type'))
  }).then(()=>{Indicator.close()})
}

const Join = resolve => {
  Indicator.open()
  require.ensure(['@/components/Join'], () => {
    resolve(require('@/components/Join'))
  }).then(()=>{Indicator.close()})
}

const Reject = resolve => {
  Indicator.open()
  require.ensure(['@/components/Reject'], () => {
    resolve(require('@/components/Reject'))
  }).then(()=>{Indicator.close()})
}

const Info = resolve => {
  Indicator.open()
  require.ensure(['@/components/Info'], () => {
    resolve(require('@/components/Info'))
  }).then(()=>{Indicator.close()})
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
  // {
  //   path: '/register2',
  //   name: 'register2',
  //   meta: {requiresAuth: false},
  //   component: Register2
  // },
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
    meta: {requiresAuth: false},
    component: Info
  }
]

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
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
  console.log('session-token',token)

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
