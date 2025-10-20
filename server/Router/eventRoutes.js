const express = require('express')
const { createEvent, getEvents, getEventDetails, deleteEvent, updateEvent } = require('../Controllers/eventController')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Event')
    next()
})

router.post('/', adminAuth, createEvent)
router.get('/', getEvents)
router.get('/:id', getEventDetails)
router.put('/:eventId', adminAuth, updateEvent) // Update event 
router.delete('/:id', adminAuth, deleteEvent)

const eventRouter = router
module.exports = eventRouter