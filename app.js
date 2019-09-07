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
//首頁
app.get('/', (req, res) => {
  res.send('hello')
})

//列出全部餐聽
app.get('/restaurants', (req, res) => {
  res.send('列出所有餐廳')
})

//新增一筆餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增餐廳頁面')
})

//顯示一筆餐廳
app.get('/restaurant/:_id', (req, res) => {
  res.send('顯示一筆餐廳')
})

//新增一筆餐廳
app.post('/restaurants/new', (req, res) => {
  res.send('新增餐廳')
})

//編輯餐廳介面
app.get('/restaurant/:_id/edit', (req, res) => {
  res.send('編輯餐廳')
})

//修改餐廳
app.post('/restaurants/:_id/edit', (req, res) => {
  res.send('修改餐聽')
})

//刪除餐廳
app.post('/restaurant/:_id/delete', (req, res) => {
  res.send('刪除餐廳')
})


//listen
app.listen(3000, () => {
  console.log('app is running')
})
