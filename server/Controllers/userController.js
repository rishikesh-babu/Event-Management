async function createUser(req, res, next) {
    console.log('Router: Create User')

    console.log('req :>> ', req);
    console.log('req.body :>> ', req.body);
}

module.exports = {
    createUser,
}