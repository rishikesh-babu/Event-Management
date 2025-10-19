const express = require('express')
const { registerEvent, updateRegistration, deleteRegistration, getUserRegisteredEvents } = require('../Controllers/registrationController')
const userAuth = require('../Middlewares/userAuth')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Registration')
    next()
})

router.get('/', userAuth, getUserRegisteredEvents)  // Fetch Registeration that are registered by a user
router.post('/:eventId', userAuth, registerEvent)   // Register the event
router.put('/:eventId', userAuth, updateRegistration)
router.delete('/:id', userAuth, deleteRegistration)

const registrationRouter = router
module.exports = registrationRouter