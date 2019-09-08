//load express
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

//routes
//列出全部餐聽
router.get('/', (req, res) => {
  res.redirect('/')
})

//新增一筆餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//顯示一筆餐廳
router.get('/:_id', (req, res) => {
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('detail', { restaurant: restaurant })
  })
})

//新增一筆餐廳
router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    image: req.body.image,
    google_map: req.body.google_map,
    description: req.body.description,
    rating: req.body.rating,
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

//編輯餐廳介面
router.get('/:_id/edit', (req, res) => {
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

//修改餐廳
router.put('/:_id/edit', (req, res) => {
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.image = req.body.image
    restaurant.google_map = req.body.google_map
    restaurant.description = req.body.description
    restaurant.rating = req.body.rating

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params._id}`)
    })
  })
})

//刪除餐廳
router.delete('/:_id/delete', (req, res) => {
  Restaurant.findById(req.params._id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

//export
module.exports = router