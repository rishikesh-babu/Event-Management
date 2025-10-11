const supabase = require("../config/db")

async function createCollage(req, res, next) {
    try {
        console.log('Router: Create')

        let { name } = req.body

        name = name.trim()

        if (!name) {
            return res.status(400).json({ message: 'Collage name is required' })
        }

        const collageResponse = await supabase.from('collages').insert([{ name }]).select('*').single()

        console.log('collageResponse :>> ', collageResponse);

        if (collageResponse.error) {
            return res.status(400).json({ message: 'Error in adding collage', data: collageResponse.error })
        }

        return res.status(200).json({ message: `Add ${collageResponse?.data?.name}`, data: collageResponse?.data })
    } catch (err) {
        next(err)
    }
}

async function getCollages(req, res, next) {
    try {
        console.log('Router: Get Collages')

        const collageExist = await supabase.from('collages').select('*')

        if (collageExist.error) {
            return res.status(400).json({ message: 'Error in fetching collages', data: collageExist.error })
        }

        return res.status(200).json({ message: 'Data fetched', data: collageExist.data })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCollage, 
    getCollages
}