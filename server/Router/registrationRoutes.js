const express = require('express')
const { registerEvent, updateRegistration, deleteRegistration } = require('../Controllers/registrationController')
const userAuth = require('../Middlewares/userAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Registration')
    next()
})

router.post('/:id', userAuth, registerEvent)
router.put('/:id', userAuth, updateRegistration)
router.delete('/:id', userAuth, deleteRegistration)

const registrationRouter = router
module.exports = registrationRouter