'use strict'
const router                         = require('express').Router()
const {leagueIDgrab,leagueSTATSgrab} = require('../models/lol')
const {listUsers}                    = require('../models/user')



// // /stats route
// router.get('/stats', leagueSTATSgrab, (req,res)=>{
//   res.json(res.stats)
// }) //end /stats

// // /getid route
// router.get('/getid', leagueIDgrab, (req,res)=>{
//   res.json({lol_id: req.body.lol_id})
// }) //end /getid

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



//export it
module.exports = router
