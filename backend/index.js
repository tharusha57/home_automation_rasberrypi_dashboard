require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const componentRoutes = require('./routes/component')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/' , componentRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log('listening on port 4000...')
        })
    })

    .catch((error) => {
        console.log(error)
    })


