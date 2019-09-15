const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

//login
router.get('/login', (req, res) => {
  res.render('login')
})

//login submit
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next)
})

//register
router.get('/register', (req, res) => {
  res.render('register')
})

//register submit
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.render('/register', {
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })
      newUser.save().then((user) => {
        res.redirect('/')
      }).catch((err) => {
        console.log(err)
      })
    }
  })

})

//logout
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router