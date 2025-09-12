const express = require('express')
const { createUser } = require('../Controllers/userController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

router.post('/create-user', createUser)

const userRouter = router
module.exports = userRouter