'use strict'
//require express router
const router                    = require('express').Router()
const { createUser, loginUser } = require('../models/user')


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



router.post('/new', createUser, (req,res)=>{
  // console.log(req.body)
  res.redirect('/user/login')
})

// / route
router.get('/', (req,res)=>{
  res.render('user/index', {user: req.session.user})
}) //end /

//export it
module.exports = router
