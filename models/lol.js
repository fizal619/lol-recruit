const {MongoClient} = require('mongodb')
const dbConnection  = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/lol-recruit'
const request       = require('request')

//function to grab league id and drop it in the req object for the other middleware to save.
function leagueIDgrab(req, res, next){
  let ign = req.body.ign || req.query.ign
  ign = ign.split(' ').join('%20')
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
      ign = ign.split('%20').join('').toLowerCase()
      req.body.lol_id = JSON.parse(body)[ign].id
    }catch(err){
      req.body.lol_id = 'undefined'
    }
    console.log('Got the id for,', ign, ':', req.body.lol_id)
    next()
  })
}


function leagueSTATSgrab(req,res,next){

  //fnction to filter the stats array that is passed back
  function unrankedFind(mode){
    return (mode['playerStatSummaryType'] == "Unranked")
  }
  function rankedFind(mode){
     return (mode['playerStatSummaryType'] == "RankedSolo5x5")
  }

  let lol_id = req.body.lol_id
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
    try{
      let stats = JSON.parse(body)['playerStatSummaries']
      req.body.stats = [
        stats.find(unrankedFind),
        stats.find(rankedFind)
        ]
      console.log('Got the stats for,', lol_id, 'normal wins:', req.body.stats[0].wins, '| ranked wins:', req.body.stats[1].wins)
    }catch(err){
      req.body.stats = 'undefined'
    }

    // console.log(req.body.stats)

    next()
  })
}





module.exports = {leagueIDgrab,leagueSTATSgrab}
