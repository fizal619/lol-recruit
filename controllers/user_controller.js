'use strict'
//require express router
const router = require('express').Router()


// / route
router.get('/', (req,res)=>{
  res.render('user/index')
}) //end /

// /register route
router.get('/register', (req,res)=>{
  res.render('user/register')
}) //end /register


// /login route
router.get('/', (req,res)=>{
  res.render('user/index')
}) //end /login


//export it
module.exports = router
