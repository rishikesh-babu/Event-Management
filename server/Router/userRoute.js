const express = require('express')
const { userSignup, useLogin } = require('../Controllers/userController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

router.post('/signup', userSignup)
router.get('/login', useLogin)

const userRouter = router
module.exports = userRouter