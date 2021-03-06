//load express
const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//load mongoose
const mongoose = require('mongoose')

//load express-handlebars
const exphbs = require('express-handlebars')

//load body-parser
const bodyParser = require('body-parser')

//load method override
const methodOverride = require('method-override')

//load express-session
const session = require('express-session')
const passport = require('passport')

const flash = require('connect-flash')



//set session
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

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
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auths'))

//listen
app.listen(3000, () => {
  console.log('app is running')
})
