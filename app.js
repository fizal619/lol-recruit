'use strict'
//require stuff
const express        = require('express')
const path           = require('path')
const logger         = require('morgan')
const bodyParser     = require('body-parser')
const session        = require('express-session')
const methodOverride = require('method-override')
const userController = require('./controllers/user_controller')

//initiate stuff
const app            = express()
const PORT           = process.env.PORT || process.argv[2] || 3000

//setting up directories
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))

//setting up morgan and other parser middleware
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sooopersekret',
  cookie: {
    maxAge: 60000
  }
}))

// Adding Method override to allow our form to delete
app.use(methodOverride('_method'))

//set up starting routes
app.get('/', (req, res) => {
  res.render('home/index', {user: req.session.user})
})

app.use('/user', userController)



//start the server
app.listen(PORT, () => {
  console.log('Server started in', __dirname)
  console.log('All systems go on', PORT)
})
