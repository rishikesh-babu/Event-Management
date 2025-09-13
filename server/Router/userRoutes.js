const express = require('express')
const { userSignup, userLogin, userLogout } = require('../Controllers/userController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

router.post('/signup', userSignup)
router.post('/login', userLogin)

router.post('/logout', userLogout)

const userRouter = router
module.exports = userRouter