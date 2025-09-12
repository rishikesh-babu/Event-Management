const express = require('express')
const { userSignup } = require('../Controllers/userController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

router.post('/signup', userSignup)

const userRouter = router
module.exports = userRouter