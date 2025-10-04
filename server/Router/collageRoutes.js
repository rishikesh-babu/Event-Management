const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Collage')
    next()
}) 

// router.post('/create')
// router.get('/collages')

const collageRouter = router
module.exports = collageRouter