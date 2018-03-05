const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = function() {
  return (process.env.NODE_ENV === 'production');
};

const buildingForLocal = () => {
  return (NODE_ENV === 'development');
};

const extractCSS = new ExtractTextPlugin({
  filename: "css/styles.css",//"[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    example1: './src/example1/example1.js',
    example2: './src/example2/example2.ts',
    example3: './src/example3/example3.ts',
    example4: './src/example4/example4.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //    options: { presets: ['es2015'] }
  //       }
  //     }

      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: true }
      //     }
      //   ]
      // }

      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
          useRelativePath: buildingForLocal()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [resolve('src')],
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: ["css-loader", "autoprefixer-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: !buildingForLocal() ?
          extractCSS.extract({
            fallback: "style-loader",
            use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
          }) :
          [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  mode: buildingForLocal() ? 'development' : 'production',
  optimization: {
    // runtimeChunk: false,
    splitChunks: {
      // chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
      // cacheGroups: {
      //     commons: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name: "vendors",
      //         chunks: "all"
      //     }
      // }
    }

  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: '../dist',
        toType: 'dir'
      }
    ]),
    new HtmlWebPackPlugin({
      template: "./src/example1/index.html",
      filename: "./example1.html",
      chunks: ['example1', 'commons']
    }),
    new HtmlWebPackPlugin({
      template: "./src/example2/index.html",
      filename: "./example2.html",
      chunks: ['example2', 'commons']
    }),
    new HtmlWebPackPlugin({
      template: "./src/example3/index.html",
      filename: "./example3.html",
      chunks: ['example3', 'commons']
    }),
    new HtmlWebPackPlugin({
      template: "./src/example4/index.html",
      filename: "./example4.html",
      chunks: ['example4', 'commons'],
      environment: process.env.NODE_ENV,
      isLocalBuild: buildingForLocal(),
      imgPath: (!buildingForLocal()) ? 'assets' : 'src/assets'
    })
  ]
};
