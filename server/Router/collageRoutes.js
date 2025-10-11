const express = require('express')
const { createCollage, getCollages } = require('../Controllers/collageController')
const adminAuth = require('../Middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Collage')
    next()
}) 

router.post('/', adminAuth, createCollage)
router.get('/', getCollages)
// router.get('/collage/:id)

const collageRouter = router
module.exports = collageRouter