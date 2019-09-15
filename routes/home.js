//load express
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth')

//home route
//首頁
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
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