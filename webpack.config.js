// webpack.config.js
const path = require('path');

// path.join的功能是拼接路径片段
// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录，即D:\webpackTest
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  }
}
