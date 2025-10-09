const express = require('express')
const { createCollage } = require('../Controllers/collageController')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Collage')
    next()
}) 

router.post('/create', adminAuth, createCollage)
// router.get('/collage/:id)
// router.get('/collages')

const collageRouter = router
module.exports = collageRouter