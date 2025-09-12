const jwt = require('jsonwebtoken')

function generateToken(user) {
    console.log('user :>> ', user);

    const payload = {
        id: user.id, 
        role: user.role
    }
    const secretKey = process.env.JWT_SECRET_KEY    
    const token = jwt.sign(payload, secretKey, {expiresIn: '1d'})

    return token
}

module.exports = generateToken