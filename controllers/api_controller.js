'use strict'
const router = require('express').Router()
const {leagueIDgrab,leagueSTATSgrab} = require('../models/lol')



// /stats route
router.get('/stats', leagueSTATSgrab, function(req,res){
  res.json(res.stats)
}) //end /stats

// /getid route
router.get('/getid', leagueIDgrab, function(req,res){
  res.json({lol_id: req.body.lol_id})
}) //end /getid

//export it
module.exports = router
