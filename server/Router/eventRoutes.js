const express = require('express')
const { createEvent } = require('../Controllers/eventController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Event')
    next()
})

router.post('/create', createEvent)

const eventRouter = router
module.exports = eventRouter