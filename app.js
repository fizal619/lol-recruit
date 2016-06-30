'use strict'
//require stuff
const express        = require('express')
const path           = require('path')
const logger         = require('morgan')
const bodyParser     = require('body-parser')
const userController = require('./controllers/user_controller')

//initiate stuff
const app            = express()
const PORT           = process.env.PORT || process.argv[2] || 3000

//setting up directories
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

//setting up morgan and json parser middleware
app.use(logger('dev'))
app.use(bodyParser.json())

//set up starting routes
app.get('/', (req,res)=>{
  res.render('home/index')
})

app.use('/user', userController)



//start the server
app.listen(PORT, ()=>{
  console.log('Server started in', __dirname)
  console.log('All systems go on', PORT)
})
