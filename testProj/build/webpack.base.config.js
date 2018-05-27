const fs = require("fs");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


//fs.copyFileSync('../src/autoComplete.css','../testProj/dist/autoComplete.css');
fs.copyFileSync('../dist/styles/modal.css','../testProj/dist/modal.css');
fs.copyFileSync('../testProj/src/app/app.html', '../testProj/dist/app.html');
fs.copyFileSync('../testProj/src/app/testApp.css', '../testProj/dist/testApp.css');

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      app: "./src/app/app.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist")
    },
    node: {
      __dirname: false,
      __filename: false
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    }
  };
};
