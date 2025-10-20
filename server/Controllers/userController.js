const supabase = require("../config/db");
const { setCookies, clearCookies } = require("../Utils/cookies");
const generateToken = require("../Utils/token");

async function userSignup(req, res, next) {
    try {
        console.log('Router: User Signup')

        let { name, email, password, department, phone, register_number, collageId } = req.body

        name = name?.trim()
        email = email?.trim()
        password = password.trim()
        department = department?.trim()
        phone = phone?.trim()
        register_number = register_number?.trim()

        if (!name || !email || !password || !department || !phone || !register_number) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userResponse = await supabase.from('users').select('*').eq('email', email).single()
        const userExist = userResponse.data

        if (userExist) {
            return res.status(404).json({ message: 'Email already exist' })
        }

        const { data, error } = await supabase.from('users').insert([{ name, email, password, department, phone, register_number, collageId }]).select('id, name, email, department, phone, register_number, role, status, created_at')

        if (error) {
            console.log('error :>> ', error);
            return res.status(404).json({ message: 'Error in signup ❌', data: error })
        }

        const userData = data[0]

        const token = generateToken(userData)
        setCookies(res, token)

        return res.status(201).json({ message: 'User signup Successfully ✅', data: userData })
    } catch (err) {
        next(err)
    }
}

async function userLogin(req, res, next) {
    try {
        console.log('Router: User Login')

        let { email, password } = req.body

        email = email?.trim()
        password = password?.trim()

        if (!email || !password) {
            return res.status(404).json({ message: 'All fields are required' })
        }

        const userResponse = await supabase.from('users').select('*').eq('email', email).single()

        if (userResponse.error) {
            return res.status(400).json({ sucess: false, message: 'Email Doesnot exist' })
        }

        const userData = userResponse.data

        if (userData.password !== password) {
            return res.status(404).json({ message: 'Password is incorrect' })
        }

        delete userData.password

        const token = generateToken(userResponse.data)
        setCookies(res, token)

        return res.status(200).json({ success: true, message: 'Login successfully ✅', data: userResponse.data })
    } catch (err) {
        next(err)
    }
}

async function userLogout(req, res, next) {
    try {
        console.log('Router: Logout')

        clearCookies(res)
        return res.status(200).json({ message: 'Logout Successfully' })
    } catch (err) {
        next(err)
    }
}

async function userProfile(req, res, next) {
    try {
        console.log('Router: Profile')

        const { id } = req.user

        if (!id) {
            return res.status(400).json({ message: 'User Id is required' })
        }

        const userExist = await supabase.from('users').select('id, name, email, role, status, phone, department, register_number, created_at').eq('id', id).single()

        if (userExist.error) {
            return res.status(400).json({ message: 'Error in fetching user details', data: userExist.error })
        }

        return res.status(200).json({ message: 'User details fetched successfully', data: userExist.data })
    } catch (err) {
        next(err)
    }
}

async function getUserForRegisteredEvents(req, res, next) {
    try {
        const { eventId } = req.params

        if (!eventId) {
            return res.status(400).json({ message: 'Event Id is required' })
        }

        const registrationsExist = await supabase.from('registrations').select('userId').eq('eventId', eventId)

        if (registrationsExist.error) {
            return res.status(400).json({ message: 'Error in fetching registrations' })
        }

        if (registrationsExist.data.length == 0) {
            return res.status(200).json({ message: 'No one registered for the event ', data: registrationsExist.length })
        }

        const userIds = registrationsExist.data.map(item => item.userId)

        const usersExist = await supabase.from('users').select('*').in('id', userIds)

        if (usersExist.error) {
            return res.status(400).json({ message: 'Error in fetching users', data: usersExist.data })
        }

        return res.status(200).json({ message: 'Successfully fetch users ', data: usersExist.data })

    } catch (err) {
        next(err)
    }
}

async function checkUser(req, res, next) {
    try {
        const id = req.user.id

        if (!id) {
            return res.status(400).json({ message: 'User Id is not defined' })
        }

        const userExist = await supabase.from('users').select('*').eq('id', id).single()

        if (userExist.error) {
            return res.status(400).json({ message: 'Error in fetching user data', data: userExist.error })
        }

        return res.status(200).json({ message: 'Authorized user', data: userExist.data })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userSignup,
    userLogin,
    userLogout,
    userProfile,
    getUserForRegisteredEvents,
    checkUser,
}