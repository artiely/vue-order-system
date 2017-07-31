// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
//var targetPath='http://172.16.7.203:80';

var config = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/mobile.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'statics/mobile',
        assetsPublicPath: '/fwone-central/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8087,
        autoOpenBrowser: true,
        assetsSubDirectory: 'statics/mobile',
        assetsPublicPath: '/', //改为../ 启动会报404
        proxyTable: {
            // '/*/orderinfo/*': {
            //   target:targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/company/*': {
            //   target:targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/person/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/person/*/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            //'/*/oncall/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/Tr/*': { //ma下单
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/calldetail/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/customernotification/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/sys/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/sys/*/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/invoice/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/contractservicedetails/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/customercomplain/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
            // '/*/callreminder/*': {
            //   target: targetPath,
            //   secure: false,
            //   changeOrigin: true,
            // },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
const targetPath = 'http://172.16.3.48:8080'; //服务器的地址 可以使www.fwone.com
const pathX = '/*'; //如果打包后接口地址为fwone-central/orderinfo/* 则pathX='/*' 如果是/orderinfo/* 则pathX=''
var keysArr = [
    pathX + '/orderinfo/*',
    pathX + '/company/*',
    pathX + '/person/*',
    pathX + '/person/*/*',
    pathX + '/oncall/*',
    pathX + '/Tr/*',
    pathX + '/calldetail/*',
    pathX + '/customernotification/*',
    pathX + '/customernotification/*/*/*',
    pathX + '/sys/*',
    pathX + '/sys/*/*',
    pathX + '/invoice/*',
    pathX + '/contractservicedetails/*',
    pathX + '/customercomplain/*',
    pathX + '/callreminder/*',
]
for (let i = 0; i < keysArr.length; i++) {
    config.dev.proxyTable[keysArr[i]] = {
        target: targetPath,
        secure: false,
        changeOrigin: true,
    }
}
console.info(Object.keys(config.dev.proxyTable))
module.exports = config