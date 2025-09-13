const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Event')
    next()
})

router.post('/create')

const eventRouter = router
module.exports = eventRouter