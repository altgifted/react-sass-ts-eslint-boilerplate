const path = require('path');
const { merge } = require('webpack-merge');
const dev = require('./webpack.dev.js');
const BrotliPlugin = require('brotli-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(dev, {
  mode: 'production',
  devtool: false,
  target: ['web', 'es2017'],
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swDest: 'sw.js',
      swSrc: path.resolve(__dirname, 'src/sw.js')
    }),
    new BrotliPlugin({
      asset: '[path].gz[query]',
      test: /\.(svg|png|jpg|gif|eot|ttf|woff|woff2|mp3)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: '[path][base].gz[query]',
      algorithm: 'brotliCompress',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: {
        level: 11
      },
      deleteOriginalAssets: false
    }),
    new WebpackPwaManifest({
      name: 'React Sass TS Eslint',
      short_name: 'React',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/'
      // TODO: Uncomment and pass yours pwa icon
      // icons: [
      //   {
      //     src: path.resolve('src/assets/pwa-icon-512.png'),
      //     sizes: [96, 128, 192, 256, 384, 512],
      //     type: "image/png",
      //     purpose: "any maskable"
      //   }
      // ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
        terserOptions: {
          compress: true,
          mangle: true,
          module: true
        }
      })
    ],
    moduleIds: 'deterministic',
    runtimeChunk: false,
    removeAvailableModules: true,
    providedExports: false,
    usedExports: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
        }
      }
    }
  }
});