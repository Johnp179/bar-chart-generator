const merge = require("webpack-merge");
const base = require("./webpack.common.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(base,{
    mode: "production",

    plugins:[
      new HtmlWebpackPlugin({
        title : "Bar chart generator",
        template: "src/index.html"
      }),
      new BundleAnalyzerPlugin(),
      
   ],
})