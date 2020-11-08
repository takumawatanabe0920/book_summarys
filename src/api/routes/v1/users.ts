var { Router } = require("express")
var router = Router()
var async = require("async")

// firebaseAdminを読み込みます
const admin = require("firebase-admin")
const firebaseTools = require("firebase-tools")
const serviceAccountKey = require("../../../firebase/serviceAccountKey.json")
// Firebase Adminの初期化処理
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://pizza-planet-0920.firebaseio.com"
})

router.get("/", async (req: any, res: any) => {
  console.log("called!!!!!!!!!!")
  const result = []
  // ユーザ一覧の取得は、1000件まで
  let listUsersResult = await admin.auth().listUsers(1000)
  result.push(...listUsersResult.users)
  console.log(result)
})

module.exports = router
