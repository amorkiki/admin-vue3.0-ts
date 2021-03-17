const fs = require('fs');
const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir:process.env.NODE_ENV === 'production' ? 'dist' : 'devDist',
  lintOnSave: false,
  css: {
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        //加上自己的路径，注意：试过不能使用别名路径
        path.resolve(__dirname, "./src/assets/style/main.less")
      ]
    }
  }
}