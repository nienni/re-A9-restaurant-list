//load express
const express = require('express')
const app = express()

//load mongoose
const mongoose = require('mongoose')

//load express-handlebars
const exphbs = require('express-handlebars')

//load body-parser
const bodyParser = require('body-parser')

//load method override
const methodOverride = require('method-override')

//set method override
app.use(methodOverride('_method'))

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
//home
app.use('/', require('./routes/home.js'))
//load /restaurants routes
app.use('/restaurants', require('./routes/restaurant.js'))

//listen
app.listen(3000, () => {
  console.log('app is running')
})
