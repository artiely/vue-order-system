/**
 * 获取地址栏参数的值
 * @param name
 * @returns {null}
 * @constructor
 */
export function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  var s = window.location.search
  var href = window.location.href
  var index = href.indexOf('?')
  if(s===''){
    r = href.substr(index+1).match(reg)
  }
  if (r != null) return unescape(r[2])
  return null
}
/**
 * 判断是否微信浏览器内访问
 * @param name
 * @returns {Boolean}
 */
export function isWeixnBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}
export function getCookie(name){
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]); return null;
}
