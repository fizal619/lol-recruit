const {MongoClient} = require('mongodb')
const dbConnection  = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/lol-recruit'

function createMessage(req,res,next){
  MongoClient.connect(dbConnection, (err, db)=>{

    //build the message object
    let message = {
      to: req.body.to,
      from: req.body.from,
      content: req.body.content,
      selected: false
    }
    //drop it in
    db.collection('messages').insertOne(message,(err, result)=>{
      if (err) throw err
      console.log('Message Recieved:',req.body.ign)
      next()
    })
  })
}

function getMessages(req,res,next){
  MongoClient.connect(dbConnection, (err, db)=>{
    let ign

    // try to grab the user from the session
    try{
      ign = req.session.user.ign
    }catch(e){
      //set to undefined if the above fails (session.user doesn't exist if the user isn't logged in)
      ign = 'undefined'
    }

    //drop it in
    db.collection('messages').find({to: ign}).toArray((err,data)=>{
      if (err) throw err
      console.log(data)
      res.messages = data
      next()
    })
  })
}

module.exports = { createMessage, getMessages }
