const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  mode: "development",
  entry: [path.resolve(__dirname, "./src/pages/index.tsx")],
  output: {
    // 出力されるファイル名
    filename: "bundle.js",
    // 出力先ディレクトリ
    path: path.resolve(__dirname, "dist")
  },
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
  //plugins: [new BundleAnalyzerPlugin()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {}
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    firebase: "firebase",
    "@material-ui/core": "MaterialUI"
  },
  //plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 3016
  }
}
