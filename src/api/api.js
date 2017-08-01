/**
 * Created by Administrator on 2017/7/20.
 */
import fetch from './fetch'

/**
 *
 * @params{loginNum:登录次数,userName:用户名,password:密码}
 *  "username=" + this.username + "&password=" + this.password + "&captcha=" + this.captcha+"&loginNum=1"
 */
const login = params => {
    return fetch({
        url: "/sys/login",
        method: 'post',
        data: params
    })
};
/**
 * 获取用户的id 此处暂时作为token使用
 */
const get_user_id = params => {
    return fetch({
        url: '/sys/user/info',
        method: 'get',
        params: params
    })
};

/**
 * 获取服务点
 */

 const get_service_address=params=>{
   return fetch({
     url:"/company/getServiceAddress",
     method:'get',
     params:params
   })
 };

 /**
  * 保存服务点地址
  */
  const save_service_address=params=>{
    return fetch({
      url:'/company/saveByUser',
      method:'post',
      data:params
    })
  };

  /**
   * 删除服务点地址
   */
   const delete_service_address=params=>{
     return fetch({
       url:'/company/deleteByUser',
       method:'post',
       data:params
     })
   }





const apiObj = {
    login,
    get_user_id,
    get_service_address,
    save_service_address,
    delete_service_address
}

export default apiObj
