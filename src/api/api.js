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
const get_user_id = params => {
    return fetch({
        url: '/sys/user/info',
        method: 'get',
        params: params
    })
}




const apiObj = {
    login,
    get_user_id
}

export default apiObj