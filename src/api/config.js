
var config = require('../../config')
var isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  console.log('%c 如果你看到这条 log , 说明当前是生产环境', 'font-size:14px;color:#f00;background:#000')
} else {
  console.log('%c 如果你看到这条 log , 说明当前是开发环境', 'font-size:14px;color:#f00;background:#000')
}
// 服务器地址
export const SERVER_BASE_URL = isProduction ? config.build.baseServerUrl : config.dev.baseServerUrl


// global.SERVER_BASE_URL = 'http://c.fwone.com/PT'; //线上地址
global.SERVER_BASE_URL = 'http://172.16.7.248:8087/fwone-central';

global.ERR_OK = 0
