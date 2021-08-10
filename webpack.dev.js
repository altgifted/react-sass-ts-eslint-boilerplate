const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'eval',
  mode: 'development',
  devServer: {
    port: 3000,
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.[jt]s?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      cache: true,
      // TODO: Add yours icons for pwa
      // favicon: './src/assets/pwa-icon-512.png',
      // icon120: '/icon120x120.png',
      // icon152: '/icon152x152.png',
      // icon167: '/icon167x167.png',
      // icon180: '/icon180x180.png',
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[fullhash:8].js',
    publicPath: '/'
  }
};
