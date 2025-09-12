const express = require('express')
const { getUser } = require('../Controllers/userController')
const router = express.Router()

router.get('/get-user',  getUser)

const apiRoute = router
module.exports = apiRoute