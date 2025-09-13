const supabase = require("../config/db")
const { setCookies } = require("../Utils/cookies")
const generateToken = require("../Utils/token")

async function adminSignup(req, res, next) {
    try {
        console.log('Rotuer: Signup')

        let { name, email, password } = req.body

        name = name?.trim()
        email = email?.trim()
        password = password?.trim()

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const adminResponse = await supabase.from('users').select('*').eq('email', email).single()
        const adminExist = adminResponse.data

        if (adminExist) {
            return res.status(400).json({ message: 'Email already exist' })
        }

        const { data, error } = await supabase.from('users').insert([{ name, email, password, role: 'admin' }]).select('id, name, email, role, status, created_at')

        if (error) {
            return res.status(404).json({ message: 'Error in signup', data: error })
        }

        const adminData = data[0]

        const token = generateToken(adminData)
        setCookies(res, token)

        return res.status(201).json({ message: 'Admin signup successfully', data: adminData })
    } catch (err) {
        next(err)
    }
}

async function adminLogin(req, res, next) {
    try {
        console.log('Router: Login')

        let { email, password } = req.body

        email = email?.trim()
        password = password?.trim()

        if (!email || !password) {
            return res.status(404).json({ message: 'All fields are required' })
        }

        const adminResponse = await supabase.from('users').select('id, name, role, status, created_at').eq('email', email).single()

        if (adminResponse.error) {
            return res.status(400).json({ message: 'Admin login failed', data: adminResponse.error })
        }

        const token = generateToken(adminResponse.data)
        setCookies(res, token)

        return res.status(200).json({ message: 'Admin Login successfully', data: adminResponse.data })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    adminSignup,
    adminLogin
}