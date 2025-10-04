const express = require('express')
const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const eventRouter = require('./eventRoutes')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Api')
    next()
})

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/event', eventRouter)
// router.use('/registration')
// router.use('/collage')

const apiRoute = router
module.exports = apiRoute