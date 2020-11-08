"use strict"

var { Router } = require("express")
var router = Router()

const users = require("./users")

router.use("/users", users)

module.exports = router
