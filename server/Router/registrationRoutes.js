const express = require('express')
const { registerEvent } = require('../Controllers/registrationController')
const userAuth = require('../Middlewares/userAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Registration')
    next()
})

router.post('/:id', userAuth, registerEvent)

const registrationRouter = router
module.exports = registrationRouter