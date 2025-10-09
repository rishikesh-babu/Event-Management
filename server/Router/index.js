const express = require('express')
const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const eventRouter = require('./eventRoutes')
const collageRouter = require('./collageRoutes')
const registrationRouter = require('./registrationRoutes')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Api')
    next()
})

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/event', eventRouter)
router.use('/registration', registrationRouter)
router.use('/collage', collageRouter)

const apiRoute = router
module.exports = apiRoute