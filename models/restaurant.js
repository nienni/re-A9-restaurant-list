const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: false,
  },

  name: {
    type: String,
    required: true,
  },

  name_en: {
    type: String,
    required: false,
  },

  image: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  google_map: {
    type: String,
    required: false,
  },

  rating: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)