// [index.js]
// Expressと関連プラグインも読み込む
//import express from "express"
// import * as cors from "cors"
// import * as bodyParser from "body-parser"
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

// firebaseAdminを読み込みます
//import admin from "firebase-admin"
const admin = require("firebase-admin")
//import firebaseTools from "firebase-tools"
const firebaseTools = require("firebase-tools")
//import serviceAccountKey from "./firebase/serviceAccountKey.json"
const serviceAccountKey = require("./firebase/serviceAccountKey.json")
// Expressの拡張
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Firebase Adminの初期化処理
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://pizza-planet-0920.firebaseio.com"
})

console.log(admin)

// ここからサーバの処理
// app.post("/getClosedGroup", (req, res) => {
//   console.log(req.body)
//   // 削除済みのグループを取得
//   admin
//     .firestore()
//     .collection("rooms")
//     .where("droped", "==", true)
//     .get()
//     .then(rooms => {
//       const list = []
//       rooms.forEach(doc => {
//         list.push(doc.id)
//       })
//       res.json({ list: list })
//     })
// })

// // 例えばこれは指定されたグループIDを削除するプログラム
// // 削除するグループIDなどのパラメータはフロントから受けとり、req.body.変数名 に格納されます
// // なお、firebaseTools.firestore.delete を使うことでサブコレクションも含めて削除してくれます。
// app.post("/deleteGroup", (req, res) => {
//   console.log("削除するグループ", req.body.roomId)
//   firebaseTools.firestore
//     .delete(`test`, {
//       project: "xxxxxx",
//       recursive: true,
//       yes: true
//     })
//     .then(() => {
//       res.json({ state: 1 })
//     })
// })

// サーバーを起動する部分
console.log("Webサーバが起動しました。localhost:3000からアクセス可能です")
app.listen(3000, function() {})
