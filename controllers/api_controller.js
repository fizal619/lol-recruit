'use strict'
const router                         = require('express').Router()
const {leagueIDgrab,leagueSTATSgrab} = require('../models/lol')
const {listUsers}                    = require('../models/user')
const { createMessage, getMessages } = require('../models/message')



//MESSAGES

//create a message
router.post('/message/new', createMessage, (req,res)=>{
  res.json({status: 'success'})
})


//read them all
router.get('/message/user', getMessages, (req, res)=>{
  res.json(res.messages)
})

//END MESSAGES

// USERS
//returns all the usable data for users in the db
router.get('/allusers', listUsers, (req,res)=>{
  res.json(res.users)
})

//sends the stats for the logged in user
router.get('/userstats', (req,res)=>{
  try{
    res.json(req.session.user.stats)
  } catch(e){
    res.json({})
  }
})

//END USERS

//export it
module.exports = router
