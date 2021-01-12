/**
 * @description:
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-01-11 11:42:37
 * @LastEditTime: 2021-01-11 11:42:37
 * @LastEditors: 小康
 */
const webpack = require('webpack')
const version = require('./package.json').version
const { resolve } = require('path')
const banner =
  'butterfly-friend v' +
  version +
  '\n' +
  '(c) 2020-' +
  new Date().getFullYear() +
  ' xiaokang\n' +
  'Released under the GPL-2.0 License.\n' +
  'Last Update: ' +
  new Date().toLocaleString()

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptiomizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    // 输出的文件名
    filename: 'friend.min.js',
    // 输出的路径
    path: resolve(__dirname, 'dist')
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
      filename: 'css/friend.min.css'
    }),
    new OptiomizeCssAssetsWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          ecma: 5,
          toplevel: true,
          ie8: true,
          safari10: true,
          compress: {
            drop_console: true
          },
          format: {
            comments: false
          }
        }
      })
    ]
  },
  // 模式 development 或 production
  mode: process.env.NODE_ENV, // 开发模式
  devServer: {
    // 构建后的路径
    contentBase: resolve(__dirname, 'dist'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: false
  }
}
