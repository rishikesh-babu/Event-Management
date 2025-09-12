const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: User')
    next()
})

const userRouter = router
module.exports = userRouter