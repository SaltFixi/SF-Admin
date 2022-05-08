const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    // 分离chunk文件
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      BMapLib: 'BMapLib'
    },
    resolve: {
      alias: {
        // '@': resolve('src')
      }
    }
  },
  devServer: {
    proxy: {
      '/api': { // 此处要与 config/index.js 中的 API_PROXY_PREFIX 值保持一致
        target: process.env.VUE_APP_AJAX_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 定制主题
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          javascriptEnabled: true
        }
      }
    }
  }
})
