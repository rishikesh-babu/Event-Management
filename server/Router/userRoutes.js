const express = require('express')
const { userSignup, userLogin, userLogout, userProfile } = require('../Controllers/userController')
const userAuth = require('../Middlewares/userAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

router.post('/signup', userSignup)
router.post('/login', userLogin)

router.post('/logout', userLogout)
router.get('/', userAuth, userProfile)

const userRouter = router
module.exports = userRouter