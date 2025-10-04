const express = require('express')
const { createEvent, getEvents } = require('../Controllers/eventController')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Event')
    next()
})

router.post('/create', adminAuth, createEvent)
router.get('/get-events', getEvents)
// router.get('get-event/:id')

const eventRouter = router
module.exports = eventRouter