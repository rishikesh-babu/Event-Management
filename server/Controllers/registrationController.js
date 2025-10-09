const supabase = require("../config/db")

async function registerEvent(req, res, next) {
    try {
        console.log('Router: Register')

        const { id: eventId } = req.params
        const { id: userId } = req.user

        if (!eventId) {
            return res.status(404).json({ message: 'Event Id is required' })
        }

        const eventExist = await supabase.from('events').select('*').eq('id', eventId).single()

        if (eventExist.error) {
            return res.status(404).json({ message: "Event doesn't exist ❌" })
        }

        const deadline = new Date(eventExist.data.registration_deadline)
        const today = new Date()

        if (today > deadline) {
            return res.status(400).json({ message: 'Registration closed ❌' })
        }

        const registrations = await supabase.from('registrations').select('*').eq('eventId', eventId)
        if (registrations.error) {
            return res.status(400).json({ message: 'Error ', data: registrations.error })
        }

        const registrationCount = registrations.data.length
        if (registrationCount >= eventExist.data.seat) {
            return res.status(400).json({ message: 'Seat is not available' })
        }

        const registeredUser = registrations.data.find((item) => item.userId === userId)
        if (registeredUser) {
            return res.status(400).json({ message: 'User already registered' })
        }

        const registerUser = await supabase.from('registrations').insert([{ userId, eventId }]).select('*').single()
        if (registerUser.error) {
            return res.status(400).json({ message: 'Error in registration ❌', data: registerUser.error })
        }

        return res.status(200).json({ message: 'Registration successfull ✅', data: registerUser.data })
    } catch (err) {
        next(err)
    }
}

async function updateRegistration(req, res, next) {
    try {
        console.log('Router: Update')

        const { id: eventId } = req.params
        const { id: userId } = req.user
        const { status } = req.body

        if (!eventId) {
            return res.status(400).json({ message: 'Event id is required' })
        }

        if (!status) {
            return res.status(400).json({ message: 'Required status updatation value' })
        }

        const userRegister = await supabase.from('registrations').update({ status }).eq('eventId', eventId).eq('userId', userId).select('*')

        console.log('userRegister :>> ', userRegister);

        if (userRegister.error) {
            return res.status(400).json({ message: 'Updation failed', data: userRegister.error })
        }

        return res.status(200).json({ message: 'Updated Successfully', data: userRegister.data })
    } catch (err) {
        next(err)
    }
}

async function deleteRegistration(req, res, next) {
    try {
        console.log('Router: delete')

        const { id: eventId } = req.params
        const { id: userId } = req.user

        if (!eventId) {
            return res.status(400).json({ message: 'Event id is reqired' })
        }

        const deleteRegistration = await supabase.from('registrations').delete().eq('eventId', eventId).eq('userId', userId).select('*').single()

        if (deleteRegistration.error) {
            return res.status(400).json({ message: 'Error in deleting registered event ', data: deleteRegistration.error })
        }

        return res.status(200).json({ message: 'Registeration deleted successfully ✅' })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    registerEvent,
    updateRegistration,
    deleteRegistration
}