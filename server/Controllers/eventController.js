const supabase = require("../config/db")

async function createEvent(req, res, next) {
    try {
        console.log('Router: Create')

        let { title, description, type, date, time, venue, total_seat, registration_deadline } = req.body

        title = title?.trim()
        description = description?.trim()
        type = type?.trim()
        venue = venue?.trim()

        if (!title || !description || !type || !date || !time || !venue || total_seat == null || total_seat <= 0 || !registration_deadline) {
            return res.status(400).json({ message: 'All fields are required and seat must be > 0' })
        }

        const eventResponse = await supabase.from('events').insert([{ title, description, type, date, time, venue, total_seat, registration_deadline }]).select('*')
        if (eventResponse.error) {
            return res.status(400).json({ message: 'Event not created ❌', data: eventResponse.error })
        }

        const eventData = eventResponse.data[0]

        return res.status(201).json({ message: 'Event Created Successfully ✅', data: eventData })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEvent
}