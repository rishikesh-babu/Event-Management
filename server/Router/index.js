const express = require('express')
const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Api')
    next()
})

router.use('/user', userRouter)
router.use('/admin', adminRouter)
// router.use('/event')
// router.use('/registration')

const apiRoute = router
module.exports = apiRoute