const jwt = require('jsonwebtoken')

async function userAuth(req, res, next) {
    try {
        console.log('Router: User Auth')

        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({ message: 'Unauthorized User ❌' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        console.log('decodedToken :>> ', decodedToken);

        if (!decodedToken) {
            return res.status(400).json({ message: 'Unauthorized User ❌' })
        }

        const role = decodedToken.role

        if (role !== 'user') {
            return res.status(400).json({ message: 'Unauthorized User ❌ ' })
        }

        req.user = decodedToken
        
        next()
    } catch (err) {
        next(err)
    }
}