const path = require("path")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  mode: "production", // 本番モード
  entry: [path.resolve(__dirname, "./src/pages/index.tsx")],
  output: {
    filename: "bundle.js",
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
  //plugins: [new UglifyJSPlugin()],
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
  devtool: "source-map"
}
