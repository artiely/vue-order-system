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

const Ma = resolve => {
  require(['@/components/Ma'], (component) => {
    resolve(component)
  })
}

const Oncall = resolve => {
  require(['@/components/Oncall'], (component) => {
    resolve(component)
  })
}
const Balance = resolve => {
  require(['@/components/Balance'], (component) => {
    resolve(component)
  })
}
const Complain = resolve => {
  require(['@/components/Complain'], (component) => {
    resolve(component)
  })
}
const Address = resolve => {
  require(['@/components/Address'], (component) => {
    resolve(component)
  })
}
const Urge = resolve => {
  require(['@/components/Urge'], (component) => {
    resolve(component)
  })
}
const Orderdetail = resolve => {
  require(['@/components/items/Orderdetail'], (component) => {
    resolve(component)
  })
}

const Pay = resolve => {
  require(['@/components/Pay'], (component) => {
    resolve(component)
  })
}

const Register = resolve => {
  require(['@/components/Register'], (component) => {
    resolve(component)
  })
}

const Type = resolve => {
  require(['@/components/Type'], (component) => {
    resolve(component)
  })
}

const Join = resolve => {
  require(['@/components/Join'], (component) => {
    resolve(component)
  })
}

const Reject = resolve => {
  require(['@/components/Reject'], (component) => {
    resolve(component)
  })
}

const Info = resolve => {
  require(['@/components/Info'], (component) => {
    resolve(component)
  })
}

const Payok = resolve => {
  require(['@/components/Payok'], (component) => {
    resolve(component)
  })
}

const Record = resolve => {
  require(['@/components/Record'], (component) => {
    resolve(component)
  })
}

const Coupons = resolve => {
  require(['@/components/Coupons'], (component) => {
    resolve(component)
  })
}

const Fpassword = resolve => {
  require(['@/components/Fpassword'], (component) => {
    resolve(component)
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
  store.commit('SET_LANG', lang)
  /**
   * 路由切换前先给state赋值
   */

    // let token = Cookies.get('token')
  let token = sessionStorage.getItem('token')
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
