const express = require('express')
const { adminSignup, adminLogin } = require('../Controllers/adminController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Admin')
    next()
})

router.post('/signup', adminSignup)
router.get('/login', adminLogin)

const adminRouter = router
module.exports = adminRouter