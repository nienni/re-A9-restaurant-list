const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
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
    let errors = []

    if (!name || !email || !password || !password2) {
      errors.push({ message: '所有欄位都需要填寫' })
    }

    if (password != password2) {
      errors.push({ message: '密碼不一樣' })
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      })
    } else {
      if (user) {
        errors.push({ message: '這個Email已經註冊過了' })
        res.render('register', {
          errors,
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

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser.save().then((user) => {
              res.redirect('/')
            }).catch((err) => {
              console.log(err)
            })
          })
        })
      }
    }
  })
})

//logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router