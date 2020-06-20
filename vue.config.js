const path = require('path');
const webpack = require('webpack');
const vConsolePlugin = require('vconsole-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); //Gzip

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  //以多页模式构建应用程序。
  pages: undefined,
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  devServer: {
    port: 8019,
    // host: '127.0.0.1',
    // host: '192.168.1.7',
    // host: '172.200.82.173',
    https: false,
    disableHostCheck: true,
    open: true,
    hotOnly: true, // 热更新
    proxy: process.env.NODE_ENV === 'production' ? { //配置自动启动浏览器
      '/api/*': {
        // target: 'http://127.0.0.1:8088',
        target: 'http://192.168.0.109:8088',
        changeOrigin: true,
        secure: false,
        ws: true//websocket支持
      }
    } : {
      '/api': {
        // target: 'http://127.0.0.1:8088',
        target: 'http://192.168.0.110:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'  //删除基本路径
        },
      }
    }
  },

  // webpack配置
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          return options;
        });
    config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          name: path.join('../main/static/', 'img/[name].[ext]')
        });
  },
  configureWebpack: config => {
    let pluginsPublic = [];
    let pluginsPro = [
      new CompressionPlugin({ //文件开启Gzip，也可以通过服务端filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$',),
        threshold: 8192,
        minRatio: 0.8,
      }),
    ];
    let pluginsDev = [
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: false // 发布代码前记得改回 false
      }),
    ];
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro, ...pluginsPublic];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev, ...pluginsPublic];
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/scss/common.scss";'
      }
    }
  }
};
