//导入模块
import axios from 'axios'
import router from '@/router'
import store from '@/store'


export default function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: SERVER_BASE_URL,
      headers: {},
      transformResponse: [function (data) {
        data = JSON.parse(data)
        console.log(data)
        console.log(typeof data)
        if (typeof data != 'object') {

          return {
            code: 1000,
            msg: '请登录'
          }
        } else {
          return data
        }

      }]
    })
    instance.interceptors.request.use(
      config => {
        return config
      },
      err => {
        console.error('来自请求的错误！', err)
        return Promise.reject(err)
      })

    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        console.error(`来自响应的的错误`, error)
        return Promise.reject({code:1000}) // 返回接口返回的错误信息
      })

    //请求处理
    instance(options)
      .then((res) => {
        if (res.code == 1000) {
          store.commit('LOGOUT')
          router.replace({name: 'login'})
        } else {
          console.log(res)
          if(res.status===200){
            resolve(res.data)
          }
        }
        return false
      })
      .catch((error) => {
        console.error('来自响应结果的错误')
        if (error.code == 1000) {
          store.commit('LOGOUT')
          router.replace({name: 'login'})
        } else {
          reject(error)
        }

      })
  })
}
