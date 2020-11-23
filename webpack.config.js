// pathモジュールの読み込み
const path = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

module.exports = {
  // モードを開発モードにする
  mode: "development",
  // 入力ファイル設定
  entry: [path.resolve(__dirname, "./src/pages/index.tsx")],
  // 出力ファイル設定
  output: {
    // 出力されるファイル名
    filename: "bundle.js",
    // 出力先ディレクトリ
    path: path.resolve(__dirname, "dist")
  },

  // モジュール設定
  module: {
    rules: [
      {
        // ts-loaderの設定
        test: /\.(js|ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: "css-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: [{ loader: "json-loader" }]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "fonts",
            outputPath: "fonts"
          }
        }
      },
      { test: /\.(gif|png|jpg|svg|)$/, use: "url-loader" }
    ]
  },

  // モジュール解決
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {}
  },
  //plugins: [],
  plugins: [new BundleAnalyzerPlugin()],
  // new BundleAnalyzerPlugin()

  // 開発モード設定
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 3016
  }
}
