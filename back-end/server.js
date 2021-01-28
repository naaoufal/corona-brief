require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

var cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected  to Database'))

app.use(express.json())

const patientsRouter = require('./routes/patients')
app.use('/patients', patientsRouter)

const cardsRouter = require('./routes/cards')
app.use('/cards', cardsRouter)

const surveysRouter = require('./routes/surveys')
app.use('/surveys', surveysRouter)




app.listen(3000, () => console.log('Server Started'))