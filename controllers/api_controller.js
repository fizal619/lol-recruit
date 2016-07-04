'use strict'
const router                                        = require('express').Router()
const {leagueIDgrab,leagueSTATSgrab}                = require('../models/lol')
const {listUsers, userTaken, userAvailable}         = require('../models/user')
const { createMessage, getMessages, deleteMessage } = require('../models/message')



//MESSAGES

//create a message
router.post('/message/new', createMessage, (req,res)=>{
  res.json({status: 'success'})
})


//read them all
router.get('/message/user', getMessages, (req, res)=>{
  res.json(res.messages)
})

//delete all messages from a single sender when rejected.
router.delete('/message/user/delete', deleteMessage, (req,res)=>{
  res.sendStatus(200)
})

//for a user to set themself as taken
router.put('/message/user/taken', userTaken, (req,res)=>{
  res.json(res.message)
})

//for a user to set them self to available through ajax
router.put('/message/user/available', userAvailable, (req,res)=>{
  res.json(res.message)
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
