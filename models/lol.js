const {MongoClient} = require('mongodb')
const dbConnection  = 'mongodb://localhost:27017/lol-recruit'
const request       = require('request')

//function to grab league id and drop it in the req object for the other middleware to save.
function leagueIDgrab(req, res, next){
  let ign = req.body.ign
  request({
    url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+ign,
    qs: {
      api_key: process.env.RIOT_DEV_KEY
    },
    method: 'GET'
  }, (error, response, body) => {
    if (error) throw error

    //save it to the req to pass it along
    req.body.lol_id = JSON.parse(body)[ign].id || 'undefined'
    console.log('Got the id for,', ign, ':', req.body.lol_id)
    next()
  })

}

// let ign = 'NexusInfinity'
//   request({
//     url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+ign,
//     qs: {
//       api_key: process.env.RIOT_DEV_KEY
//     },
//     method: 'GET'
//   }, (error, response, body) => {
//     if (error) throw error

//     console.log(JSON.parse(body)[ign].id)

//   })


module.exports = {leagueIDgrab}
