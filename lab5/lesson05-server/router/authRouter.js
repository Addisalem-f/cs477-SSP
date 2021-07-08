const express = require('express')
const userController = require("../controller/userController")

const router = express.Router()

router.post('/login', userController.login)
router.use(userController.authorize)
module.exports = router