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

module.exports = {
    registerEvent
}