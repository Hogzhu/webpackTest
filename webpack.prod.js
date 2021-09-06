const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'source-map', // 会生成完整的sourceMap文件用于调试，但会减慢打包速度
    plugins: [
        new CleanWebpackPlugin(['./dist']), // 清理目录
    ]
})