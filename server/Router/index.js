const express = require('express')
const userRouter = require('./userRoute')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Api')
    next()
})

router.use('/user', userRouter)
// router.use('/admin')
// router.use('/event')
// router.use('/registration')

const apiRoute = router
module.exports = apiRoute