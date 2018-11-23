const express = require('express')
const db = require('../config/connection')
const app = express()
const config = require('../config/parameters')
const chaine = require('./chaines')
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/chaine', chaine)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.json('error')
})
db.connect(config.DB_URL, function (err, result) {
  if (err) {
    return console.log('Could not connect', err)
  }
  app.listen(config.PORT)
  console.log('Server Alive & Connected')
})
