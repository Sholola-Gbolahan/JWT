const express = require("express")
const router = express.Router()

const { login, dashboard } = require("../controllers/main")
const authMiddleware = require("../middleware/auth")

//  2.Apply the auth to route where it's needed
router.route("/dashboard").get(authMiddleware, dashboard)

router.route("/login").post(login)

module.exports = router
