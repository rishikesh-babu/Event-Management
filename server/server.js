const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const apiRoute = require('./Router')
const cookieParser = require('cookie-parser')
const port = 3000

dotenv.config()
const app = express()

app.use(cors({

    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running at port:', port)
    } else {
        console.log('err :>> ', err);
    }
})

app.use((req, res, next) => {
    console.log('\nreq.method :>> ', req.method);
    console.log('req.path :>> ', req.path);

    next()
})

// Base route
app.get('/', (req, res, next) => {
    return res.send('Hello World')
})

// API Routes
app.use('/api', apiRoute)

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    return res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

// Catch-all for unknown routes
app.use((req, res) => {
    console.warn('Endpoint does not exist:', req.originalUrl);
    return res.status(404).json({ message: 'Endpoint does not exist' });
});
