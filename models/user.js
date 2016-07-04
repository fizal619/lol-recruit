const { MongoClient } = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/lol-recruit'
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

function loginUser(req,res,next) {
  let email = req.body.email;
  let password = req.body.password;

  MongoClient.connect(dbConnection, (err, db)=>{
    db.collection('users').findOne({"email": email}, (err, user)=>{
      if(err) throw err;
      if(user === null) {
        console.log('Can\'t find user with email ',email);
      } else  if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
      }
      next();
    })
  })
}

function createSecure(email, password, callback) {
  bcrypt.genSalt((err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
      callback(email,hash);
    })
  })
}

function createUser(req, res, next) {
  createSecure( req.body.email, req.body.password, saveUser)
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, (err, db)=>{
      let userInfo = {
        name: req.body.name,
        email: email,
        ign: req.body.ign,
        lol_id: req.body.lol_id,
        stats: req.body.stats,
        taken: false,
        passwordDigest: hash
      }
      db.collection('users').insertOne(userInfo, (err, result)=>{
        if(err) throw err;
        next();
      });
    });
  }
}

//when the user clicks accept on any message it will set his/her status to taken in the db
function userTaken(req,res,next){
  MongoClient.connect(dbConnection, (err, db)=>{
    try{
      db.collection('users').updateOne({ign: req.session.user.ign}, {$set: {taken: true}}, (err, results)=>{
        if (err) throw err
        res.message = {status: 'OK'}
        //update it for the current session
        req.session.user.taken = true
        next()
      })
    }catch(e){
      res.message = e
      next()
    }
    })
}

//separate function to make them available, making one function that toggles would have been unwise.
function userAvailable(req,res,next){
   MongoClient.connect(dbConnection, (err, db)=>{
    try{
      db.collection('users').updateOne({ign: req.session.user.ign}, {$set: {taken: false}}, (err, results)=>{
        if (err) throw err
        res.message = {status: 'OK'}
        //update it for the current session
        req.session.user.taken = false
        //set any selected messages to false
        db.collection('messages').updateMany({selected: true}, {$set: {selected: false}})
        next()
      })
    }catch(e){
      res.message = e
      next()
    }
    })
}


// Making sure not to return the user's sensitive info when used. [x]
function listUsers(req,res,next){
   MongoClient.connect(dbConnection, (err, db)=>{
    db.collection('users').find().toArray((err,data)=>{
      let clean = []
      for(user in data){
        let cleaned = {
          name: data[user].name,
          ign: data[user].ign,
          lol_id: data[user].lol_id,
          taken: data[user].taken,
          stats: data[user].stats
        }
        clean.push(cleaned)
      }
      res.users = clean
      next()
    })
  })
}




module.exports = { createUser, loginUser, listUsers, userTaken, userAvailable}
