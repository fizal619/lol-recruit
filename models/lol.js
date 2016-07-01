const {MongoClient} = require('mongodb')
const dbConnection  = process.env.MONGODB_URI
const request       = require('request')

//function to grab league id and drop it in the req object for the other middleware to save.
function leagueIDgrab(req, res, next){
  let ign = req.body.ign || req.query.ign
  request({
    url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+ign,
    qs: {
      api_key: process.env.RIOT_DEV_KEY
    },
    method: 'GET'
  }, (error, response, body) => {
    if (error) throw error

    //save it to the req to pass it along
    try{
      req.body.lol_id = JSON.parse(body)[ign].id
    }catch(err){
      req.body.lol_id = 'undefined'
    }
    console.log('Got the id for,', ign, ':', req.body.lol_id)
    next()
  })
}


function leagueSTATSgrab(req,res,next){
  let lol_id = req.session.lol_id || req.query.lol_id
  request({
    url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+lol_id+'/summary',
    qs: {
      season:'SEASON2016',
      api_key: process.env.RIOT_DEV_KEY
    },
    method: 'GET'
  }, (error, response, body) => {
    if (error) throw error

    //save it to the req to pass it along
    res.stats = JSON.parse(body)['playerStatSummaries'][14] || 'undefined'
    console.log('Got the stats for,', lol_id, 'wins:', res.stats.wins)
    next()
  })
}


//  let lol_id = 39074418
//   request({
//     url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+lol_id+'/summary',
//     qs: {
//       season:'SEASON2016',
//       api_key: process.env.RIOT_DEV_KEY
//     },
//     method: 'GET'
//   }, (error, response, body) => {
//     if (error) throw error

//     console.log(JSON.parse(body)['playerStatSummaries'][14])
// })

module.exports = {leagueIDgrab,leagueSTATSgrab}
