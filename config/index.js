// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
//var targetPath='http://172.16.7.203:80';

const config = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/mobile.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'statics/mobile',
    assetsPublicPath: '/PT/',
    // baseServerUrl: 'http://172.16.3.48:8080/PT', // 测试
    baseServerUrl: '/PT', // 测试
    // baseServerUrl: 'http://weixintestt.tunnel.echomod.cn/PT', // 测试
    // baseServerUrl: 'http://localhost:8087/PT', // 本地
    // baseServerUrl: 'c.fwone.com/PT', // 上线
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8088,
    autoOpenBrowser: true,
    assetsSubDirectory: 'statics/mobile',
    assetsPublicPath: '/',
    // baseServerUrl: 'http://localhost:8088/PT',// 本地
    baseServerUrl: '/PT',// 本地
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
const targetPath = 'http://ct.fwone.com' //服务器的地址 可以使www.fwone.com
const pathX = '/*'
var keysArr = [
  pathX + '/orderinfo/**/*',
  pathX + '/company/**/*',
  pathX + '/person/**/*',
  pathX + '/oncall/**/*',
  pathX + '/Tr/**/*',
  pathX + '/calldetail/**/*',
  pathX + '/customernotification/**/*',
  pathX + '/sys/**/*',
  pathX + '/invoice/**/*',
  pathX + '/contractservicedetails/**/*',
  pathX + '/customercomplain/**/*',
  pathX + '/callreminder/**/*',
  pathX + '/fwonePay/**/*',
  pathX + '/mobileMsg/**/*',
  pathX + '/wechat/**/*',
  pathX + '/logout/**/*',
  pathX + '/oauth2/**/*',
  pathX + '/invoice/**/*',
  pathX + '/coupon/**/*',
  pathX + '/msg/**'
]
for (let i = 0; i < keysArr.length; i++) {
  config.dev.proxyTable[keysArr[i]] = {
    target: targetPath,
    secure: false,
    changeOrigin: true,
  }
}
module.exports = config
