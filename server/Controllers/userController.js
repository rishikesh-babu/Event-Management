const supabase = require("../config/db");

async function userSignup(req, res, next) {
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

    const { data, error } = await supabase.from('users').insert([{ name, email, password }])
    if (error) {
        console.log('error :>> ', error);
        return res.status(404).json({ message: 'Error in inserting data', data: error })
    }

    console.log('data :>> ', data);
    return res.status(201).json({ message: 'User login Successfully', data })
}

module.exports = {
    userSignup,
}