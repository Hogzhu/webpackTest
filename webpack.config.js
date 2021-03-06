// webpack.config.js
const path = require('path');
const webpack = require('webpack'); // 引入webpack模块
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

// path.join的功能是拼接路径片段
// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录，即D:\webpackTest
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'), // 会自动生成一个dist目录
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: '8080',
    hot: true,
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
  devtool: 'cheap-module-eval-source-map',
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
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node-modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件，实例化后devserver的hot属性才生效
    new webpack.BannerPlugin('这是webpack插件打出来的'), // new一个插件的实例，这个插件会让产物带上该文案注释
    new htmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html') // 将该html作为打包的模板
    }),
    new cleanWebpackPlugin(['./dist', './dist1']), // 清理文件夹
  ]
}
