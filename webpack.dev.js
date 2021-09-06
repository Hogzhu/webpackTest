// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devServer: {
        contentBase: './dist', // 本地服务器所加载的目录
        port: '8080', // 端口号
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true, // 不跳转
        hot: true, // 热加载
    }
})