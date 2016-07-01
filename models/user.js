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
        ign: req.body.ign,
        lol_id: req.body.lol_id,
        email: email,
        passwordDigest: hash
      }
      db.collection('users').insertOne(userInfo, (err, result)=>{
        if(err) throw err;
        next();
      });
    });
  }
}


function listUsers(req,res,next){
   MongoClient.connect(dbConnection, (err, db)=>{
    db.collection('users').find().toArray((err,data)=>{
      res.users = data
      next()
    })
  })
}



module.exports = { createUser, loginUser, listUsers }
