const express = require('express')
const { createEvent } = require('../Controllers/eventController')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Event')
    next()
})

router.post('/create', adminAuth, createEvent)

const eventRouter = router
module.exports = eventRouter