'use strict'
//require express router
const router                               = require('express').Router()
const { createUser, loginUser, listUsers } = require('../models/user')
const {leagueIDgrab,leagueSTATSgrab}       = require('../models/lol')


// /register route
router.get('/register', (req,res)=>{
  res.render('user/register', {user: req.session.user})
}) //end /register


// /login route
router.get('/login', (req,res)=>{
  res.render('user/login', {user: req.session.user})
}) //end /login

router.post('/login', loginUser, (req, res)=>{
  console.log(res.user)
  req.session.user = res.user

  req.session.save((err)=>{
    if(err) throw err
    res.redirect('/user')
  })
})



// /logout
router.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) throw err
    res.redirect('/')
  })
}) //end /logout


router.post('/new', leagueIDgrab, leagueSTATSgrab, createUser, (req,res)=>{
  // console.log(req.body)
  res.redirect('/user/login')
})

// / route
router.get('/', (req,res)=>{
  if((typeof req.session.user) != 'undefined'){
    res.render('user/index', {user: req.session.user})
  }else{
    res.redirect('/')
  }
}) //end /

//export it
module.exports = router
