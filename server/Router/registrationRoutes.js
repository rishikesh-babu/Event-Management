const express = require('express')
const { registerEvent, updateRegistration } = require('../Controllers/registrationController')
const userAuth = require('../Middlewares/userAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Registration')
    next()
})

router.post('/:id', userAuth, registerEvent)
router.put('/:id', userAuth, updateRegistration)
router.delete('/:id', userAuth)

const registrationRouter = router
module.exports = registrationRouter