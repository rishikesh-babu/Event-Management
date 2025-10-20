const express = require('express')
const { userSignup, userLogin, userLogout, userProfile, getUserForRegisteredEvents, checkUser } = require('../Controllers/userController')
const userAuth = require('../Middlewares/userAuth')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

router.post('/signup', userSignup)
router.post('/login', userLogin)

router.post('/logout', userLogout)
router.get('/', userAuth, userProfile)
router.get('/check', userAuth, checkUser)
router.get('/:eventId', adminAuth, getUserForRegisteredEvents) // Fetch users that are registered for an event

const userRouter = router
module.exports = userRouter