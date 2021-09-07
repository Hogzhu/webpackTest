// webpack.common.js
const path = require('path');
const webpack = require('webpack'); // 引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // entry: path.join(__dirname, './src/index.js'),
  // 两个入口对应两个出口，键名对应生成的js名
  entry: {
    index: path.join(__dirname, './src/index.js'),
    two: path.join(__dirname, './src/two.js'),
  },
  output: {
    path: path.join(__dirname, './dist'), // 会自动生成一个dist目录
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        // use: [
        //   // 采用对象配置loader的方法
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'},
        //   {loader: 'postcss-loader'}
        // ]
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader', // 相当于回滚，经postcss-loader和css-loader处理过的css最终再经过style-loader处理
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要使用的loader，一定需要这个顺序，因为loader是从右往左编译的
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
    new ExtractTextWebpackPlugin({
      filename: `/css/index.${new Date().getTime()}.css` // extract这个插件不支持使用hash，使用时间戳代替
    }),
  ]
}