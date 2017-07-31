//导入模块
import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default function fetch(options) {
    return new Promise((resolve, reject) => {
        // https://github.com/mzabriskie/axios

        //创建一个axios实例
        const instance = axios.create({
                //设置默认根地址
                baseURL: SERVER_BASE_URL,
                //设置请求超时设置
                timeout: 5000,
                //设置请求时的header
                headers: {

                },

            })
            // http request 拦截器
        instance.interceptors.request.use(
            config => {

                // config.headers.Authorization = "token";
                console.log("config", config)
                return config;
            },
            err => {

                return Promise.reject(err);
            });

        // http response 拦截器
        instance.interceptors.response.use(
            response => {

                return response;
            },
            error => {

                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // 返回 401 清除token信息并跳转到登录页面
                            store.commit(types.LOGOUT);
                            router.replace({
                                path: 'login',
                                query: { redirect: router.currentRoute.fullPath }
                            })
                    }
                }
                return Promise.reject(error.response.data) // 返回接口返回的错误信息
            });

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
                resolve(res.data)
                return false
                    // Message.warning(msg)
                    // reject({code, msg, data})
            })
            .catch((error) => {
                //请求失败时,根据业务判断状态
                if (error.response) {
                    let resError = error.response
                    let resCode = resError.status
                    let resMsg = error.message

                    reject({ code: resCode, msg: resMsg })
                }
            })
    })
}