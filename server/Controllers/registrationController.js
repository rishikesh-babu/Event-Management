async function registerEvent(req, res, next) {
    try {
        console.log('Router: Register') 

        const { id } = req.params
    } catch (err) {
        next(err)
    }
}