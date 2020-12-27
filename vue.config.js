const path = require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
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
    port: 8067,
    // host: '127.0.0.1',
    // host: '192.168.1.7',
    // host: '172.200.82.173',
    https: false,
    // 热更新
    hotOnly: true,
    // 配置自动启动浏览器
    open: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://118.178.120.226:8088',
        target: 'http://127.0.0.1:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'  //删除基本路径
        }
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
    if (IS_PROD) {
      config.optimization.minimizer('terser').tap((args) => {
        // 注释console.*
        args[0].terserOptions.compress.drop_console = true
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true
        // 移除 console.log
        args[0].terserOptions.compress.pure_funcs = ['console.log']
        // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
        args[0].terserOptions.output = {
          comments: false
        }
        return args
      })
    }
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
    ];
    if (IS_PROD) {
      // 为生产环境修改配置...
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
