const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Registration')
    next()
})

// router.post('/:id')

const registrationRouter = router
module.exports = registrationRouter