const express = require('express')
const { createEvent } = require('../Controllers/eventController')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Event')
    next()
})

router.post('/create', adminAuth, createEvent)
// router.get('/event')
// router.get('event/:eventId')

const eventRouter = router
module.exports = eventRouter