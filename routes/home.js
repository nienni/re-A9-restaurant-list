//load express
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

//home route
//首頁
router.get('/', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})


//export
module.exports = router