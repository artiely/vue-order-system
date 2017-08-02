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

/**
 * [get_order_list 获取订单列表]
 *  @params:
 *   {
 *   limit:'条数',
 *   page:'页码',
 *   order:'asc排序',
 *   orderStateId:'订单状态id',
 *   contractId:'未知',
 *   startDate:'开始日期',
 *   endDate:'结束日期',
 *   companyId:'公司id',
 *   on:'订单编号',
 *   yh:'用户',
 *   sfzc:'是否驻场 false',
 *   sfxc:'是否现场 false',
 *   sfbx:'是否报修 false',
 *
 *   }
 */
const get_order_list=params=>{
  return fetch({
    url:'/orderinfo/listVo',
    method:'get',
    params:params
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
