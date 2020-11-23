// [index.js]
// Expressと関連プラグインも読み込む
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
// const multer = require("multer")
// const multipart = multer()

const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require("./../../webpack.config.js")

const app = express()
var router = require("./routes/v1/")
const allowCrossDomain = function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  )

  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

app.use("/v1", router)

const devServerEnabled = true

if (devServerEnabled) {
  config.entry.unshift("webpack-hot-middleware/client?reload=true&timeout=1000")

  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  const compiler = webpack(config)

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.path
    })
  )

  app.use(webpackHotMiddleware(compiler))
}
app.use(express.static("../../../dist"))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// サーバーを起動する部分
console.log("Webサーバが起動しました。localhost:3012からアクセス可能です")
app.listen(3012, function() {})
