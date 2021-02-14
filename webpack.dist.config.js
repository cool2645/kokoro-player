const path = require('path')

const BannerPlugin = require('webpack').BannerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const pkg = require('./package.json')

module.exports = ({ mode }) => {
  return {
    mode,
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      library: 'KokoroPlayer',
      libraryTarget: 'umd',
      filename: 'kokoro-player.min.js',
      path: path.resolve(__dirname, 'dist')
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
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    },
    devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
    plugins: [
      new BundleAnalyzerPlugin(),
      new BannerPlugin(`${pkg.name} - ${pkg.description}
--------
@version ${pkg.version}
@homepage: ${pkg.homepage}
@license ${pkg.license}
@author ${pkg.author}
`)
    ]
  }
}
