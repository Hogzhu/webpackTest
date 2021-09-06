// webpack.common.js
const path = require('path');
const webpack = require('webpack'); // 引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'), // 会自动生成一个dist目录
    filename: 'bundle.js',
  },
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html') // 将该html作为打包的模板
    }),
  ]
}