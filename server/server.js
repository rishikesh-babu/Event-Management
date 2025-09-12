const express = require('express')
const supabase = require('./config/db')
const port = 3000

const app = express()


app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running at port:', port)
    } else {
        console.log('err :>> ', err);
    }
})

async function fetchUser() {
    const { data, error } = await supabase.from('user').select('*')

    console.log('data :>> ', data);
    console.log('error :>> ', error);
}

fetchUser()