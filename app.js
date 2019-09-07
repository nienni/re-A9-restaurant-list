//load express
const express = require('express')
const app = express()

//load mongoose
const mongoose = require('mongoose')

//connect mongodb
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

//define db
const db = mongoose.connection

//test connection
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

//load restaurant model
const Restaurant = require('./models/restaurant.js')

//route
app.get('/', (req, res) => {
  res.send('hello')
})

//listen
app.listen(3000, () => {
  console.log('app is running')
})
