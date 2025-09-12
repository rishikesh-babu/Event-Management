const express = require('express')
const supabase = require('./config/db')
const apiRoute = require('./Router')
const port = 3000

const app = express()


app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running at port:', port)
    } else {
        console.log('err :>> ', err);
    }
})

app.use('api', apiRoute)