const supabase = require("../config/db")

async function createEvent(req, res, next) {
    try {
        console.log('Router: Create')

        let { title, description, type, date, time, collageId, seat, registration_deadline } = req.body

        title = title?.trim()
        description = description?.trim()
        type = type?.trim()

        if (!title || !description || !type || !date || !time || !collageId || seat == null || seat <= 0 || !registration_deadline) {
            return res.status(400).json({ message: 'All fields are required and seat must be > 0' })
        }

        const collageResponse = await supabase.from('collage').select('*').eq('id', collageId).single()
        const collageExist = collageResponse.data

        if (!collageExist) {
            return res.status(404).json({ message: 'Collage does not exist ❌' })
        }

        const eventResponse = await supabase.from('events').insert([{ title, description, type, date, time, collageId, seat, registration_deadline }]).select('*')
        if (eventResponse.error) {
            return res.status(400).json({ message: 'Event not created ❌', data: eventResponse.error })
        }

        const eventData = eventResponse.data[0]

        return res.status(201).json({ message: 'Event Created Successfully ✅', data: eventData })
    } catch (err) {
        next(err)
    }
}

async function getEvents(req, res, next) {
    try {
        console.log('Router: Get Events')

        const eventExist = await supabase.from('events').select('*')

        console.log('eventExist :>> ', eventExist);

        if (eventExist.error) {
            return res.status(404).json({ message: 'Error in fetching event' })
        }

        return res.status(200).json({ message: 'Event fetched ✅', data: eventExist.data })
    } catch (err) {
        next(err)
    }
}

async function getEventDetails(req, res, next) {
    try {
        console.log('Router: Get Event Details')

        const { id } = req.params

        if (!id) {
            return res.status(404).json({ message: 'Collage or event id not found ❌' })
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEvent,
    getEvents
}