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
  const { uid } = req.query
  try {
    const user = await admin.auth().getUser(uid)

    res.status(200)
    return res.json({
      status: 200,
      msg: "success",
      data: user
    })
  } catch (e) {
    console.log(e.message)
    res.status(400)
    return res.json({
      status: 400,
      msg: e.message,
      data: []
    })
  }
})

module.exports = router
