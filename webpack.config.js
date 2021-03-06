const path = require('path')

const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = ({ mode }) => {
  return {
    mode,
    entry: path.join(__dirname, 'demo/app.js'),
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-nullish-coalescing-operator']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './demo/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }),
      new CopyWebpackPlugin([
        {
          context: 'node_modules/@webcomponents/webcomponentsjs',
          from: '**/*.js',
          to: 'webcomponents'
        }
      ])
    ],
    devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
    devServer: {
      port: 3000,
      contentBase: path.join(__dirname, 'demo'),
      historyApiFallback: true,
      hot: true
    }
  }
}
