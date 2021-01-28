const path = require('path')

const BannerPlugin = require('webpack').BannerPlugin

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
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader'
        }
      ]
    },
    devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
    plugins: [
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
