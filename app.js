const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const PORT = 3001

const app = express()
const user = require('./routes/userRoute')

mongoose
    .connect('mongodb://localhost:27017/nearBylocation')
    .then(()=>{
        console.log('db connection is established')
    })
    .catch(err=>{
        console.log('error while connecting db')
    })
    

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use('/user', user)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
