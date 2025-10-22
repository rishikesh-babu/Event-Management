const supabase = require("../config/db")

async function createEvent(req, res, next) {
    try {
        console.log('Router: Create')

        let { title, description, type, fee, date, time, collageId, seat, registration_deadline } = req.body

        title = title?.trim()
        description = description?.trim()
        type = type?.trim()

        if (!title || !description || !type || !fee || !date || !time || !collageId || seat == null || seat <= 0 || !registration_deadline) {
            return res.status(400).json({ message: 'All fields are required and seat must be > 0' })
        }

        const collageResponse = await supabase.from('collages').select('*').eq('id', collageId).single()
        const collageExist = collageResponse.data

        if (!collageExist) {
            return res.status(404).json({ message: 'Collage does not exist ❌' })
        }

        const eventResponse = await supabase.from('events').insert([{ title, description, type, fee, date, time, collageId, seat, registration_deadline }]).select('*')
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
            return res.status(404).json({ message: 'Event id is required ❌' })
        }

        const eventExist = await supabase.from('events').select('*').eq('id', id).single()

        if (eventExist.error) {
            return res.status(404).json({ message: 'Failed to fetch event ', data: eventExist.error })
        }

        return res.status(200).json({ message: 'Event fetched successfully', data: eventExist.data })
    } catch (err) {
        next(err)
    }
}

async function deleteEvent(req, res, next) {
    try {
        console.log('Router: Delete')

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'Event Id is required' })
        }

        const deleteEvent = await supabase.from('events').delete().eq('id', id)

        if (deleteEvent.error || !deleteEvent.data) {
            return res.status(400).json({ message: 'Error in deleting event', data: deleteEvent.error })
        }

        return res.status(200).json({ message: 'Event deleted successfully ✅' })
    } catch (err) {
        next(err)
    }
}

async function updateEvent(req, res, next) {
    try {
        const { title, description, type, fee, date, time, seat, registration_deadline } = req.body
        const { eventId } = req.params

        if (!eventId) {
            return res.status(400).json({ message: 'Event Id is required' })
        }

        const updateData = {}

        if (title) {
            updateData.title = title
        }

        if (description) {
            updateData.description = description
        }

        if (type) {
            updateData.type = type
        }

        if (fee !== undefined) {
            updateData.fee = fee
        }

        if (date) {
            updateData.date = date
        }

        if (time) {
            updateData.time = time
        }

        if (seat) {
            updateData.seat = seat
        }

        if (registration_deadline) {
            updateData.registration_deadline = registration_deadline
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        const updatedEvent = await supabase.from('events').update(updateData).eq('id', eventId).select('*').single()

        if (updatedEvent.error) {
            return res.status(400).json({ message: 'Error in updating event', data: updatedEvent.error })
        }

        return res.status(200).json({ message: 'Event updated successfully✅', data: updatedEvent.data })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventDetails,
    deleteEvent, 
    updateEvent
}