//导入模块
import axios from 'axios'
import router from '@/router'
import store from '@/store'


export default function fetch (options) {
  return new Promise((resolve, reject) => {
    // https://github.com/mzabriskie/axios

    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: SERVER_BASE_URL,
      // baseURL: 'PT/',
      //设置请求超时设置
      timeout: 20000,
      //设置请求时的header
      headers: {},
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        data = JSON.parse(data)
        // console.log(data)
        // console.log(typeof data)
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
    // http request 拦截器
    instance.interceptors.request.use(
      config => {

        // config.headers.Authorization = "token";
        // console.log("config", config)
        return config
      },
      err => {
        console.error('来自请求的错误！', err)
        return Promise.reject(err)
      })

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 401:
        //       // 返回 401 清除token信息并跳转到登录页面
        //       store.commit(types.LOGOUT);
        //       router.replace({
        //         path: 'login',
        //         query: {redirect: router.currentRoute.fullPath}
        //       })
        //   }
        // }
        console.error(`来自响应的的错误`, error)
        return Promise.reject({code:1000}) // 返回接口返回的错误信息
      })

    //请求处理
    instance(options)
      .then((res) => {
        //请求成功时,根据业务判断状态
        /*  if (code === port_code.success) {
         resolve({code, msg, data})
         return false
         } else if (code === port_code.unlogin) {
         setUserInfo(null)
         router.replace({name: "login"})
         }*/
        if (res.code == 1000) {
          router.replace({name: 'login'})
        } else {
          resolve(res.data)
        }
        // console.log(res)

        return false
        // Message.warning(msg)
        // reject({code, msg, data})
      })
      .catch((error) => {
        //请求失败时,根据业务判断状态
        console.error('来自响应结果的错误')
        reject(error)
      })
  })
}
