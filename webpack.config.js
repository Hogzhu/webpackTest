// webpack.config.js
const path = require('path');

// path.join的功能是拼接路径片段
// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录，即D:\webpackTest
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: '8080',
    inline: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 能帮助定位到源文件，但会影响打包速度
  devtool: 'inline-source-map',
  // 对loaders的配置
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ['style-loader', 'css-loader'] // 需要使用的loader，一定需要这个顺序，因为loader是从右往左编译的
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
