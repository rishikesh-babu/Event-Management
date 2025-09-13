const jwt = require('jsonwebtoken')

async function adminAuth(req, res, next) {
    try {
        console.log('Router: Admin Auth')

        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({ message: 'Unauthorized Admin ❌' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        console.log('decodedToken :>> ', decodedToken);

        if (!decodedToken) {
            return res.status(400).json({ message: 'Unauthorized Admin ❌' })
        }

        const role = decodedToken.role

        if (role !== 'admin') {
            return res.status(400).json({ message: 'Unauthorized Admin ❌' })
        }

        req.user = decodedToken

        next()
    } catch (err) {
        next()
    }
}

module.exports = adminAuth