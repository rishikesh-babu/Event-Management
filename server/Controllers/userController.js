const supabase = require("../config/db");
const { setCookies } = require("../Utils/cookies");
const generateToken = require("../Utils/token");

async function userSignup(req, res, next) {
    try {
        console.log('Router: User Signup')

        const { name, email, password } = req.body

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
            return res.status(404).json({ message: 'Error in inserting data', data: error })
        }

        const userData = data[0]

        const token = generateToken(userData)
        setCookies(res, token)

        return res.status(201).json({ message: 'User login Successfully', data: userData })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userSignup,
}