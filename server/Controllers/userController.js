const supabase = require("../config/db");
const { setCookies } = require("../Utils/cookies");
const generateToken = require("../Utils/token");

async function userSignup(req, res, next) {
    try {
        console.log('Router: User Signup')

        let { name, email, password } = req.body

        name = name?.trim()
        email = email?.trim()
        password = password.trim()

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All field are required' })
        }

        const userResponse = await supabase.from('users').select('*').eq('email', email).single()
        const userExist = userResponse.data

        if (userExist) {
            return res.status(404).json({ message: 'Email already exist' })
        }

        const { data, error } = await supabase.from('users').insert([{ name, email, password }]).select('id, name, email, role, status, created_at')
        if (error) {
            console.log('error :>> ', error);
            return res.status(404).json({ message: 'Error in signup', data: error })
        }

        const userData = data[0]

        const token = generateToken(userData)
        setCookies(res, token)

        return res.status(201).json({ message: 'User signup Successfully', data: userData })
    } catch (err) {
        next(err)
    }
}

async function useLogin(req, res, next) {
    try {
        console.log('Router: User Login')

        let { email, password } = req.body

        email = email?.trim()
        password = password?.trim()

        if (!email || !password) {
            return res.status(404).json({ message: 'All fields are required' })
        }

        const userResponse = await supabase.from('users').select('id, name, email, role, status, created_at').eq('email', email).single()

        if (userResponse.error) {
            return res.status(400).json({ message: 'User login failed', data: userResponse.error })
        }

        const token = generateToken(userResponse.data)
        setCookies(res, token)

        return res.status(200).json({ message: 'Login successfully', data: userResponse.data })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userSignup,
    useLogin
}