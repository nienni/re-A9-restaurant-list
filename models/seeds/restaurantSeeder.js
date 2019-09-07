//load mongoose
const mongoose = require('mongoose')

//load restaurant model
const Restaurant = require('../restaurant.js')

//connect mongodb
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

//define db
const db = mongoose.connection

//load restaurant.json
const { results: results } = require('../../restaurant.json')

//test mongodb connection
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  results.forEach(restaurant => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
  })

  console.log('done')
})


