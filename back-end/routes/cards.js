const express = require('express')
const winston = require('winston')
const router = express.Router()
const Card = require('../models/cards')

//Log time infos

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1; //As January is 0.
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

const logConfig = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./logFolder/logs.log",
      }),
    ],
  };
  const myLogger = winston.createLogger(logConfig);



// Getting all
router.get('/', async (req,res) => {
    try{
        const cards = await Card.find()
        res.send(cards)
        myLogger.log({
            message:" Cards found",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    }
})

// Getting one
router.get('/:id', getCard, (req,res) => {
    res.json(res.card)
})

//Getting by patient id

router.get('/findcardbypatient/:idpatient', async (req,res) => {
    try{
        const cards = await Card.find({}).where('id_patient').equals(req.params.idpatient)
        res.send(cards)
        myLogger.log({
            message:" Card found",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/findcardbypatient/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/findcardbypatient/",
          });
    }
})


// Creating one
router.post('/', async (req,res) => {
    const card = new Card({
        id_patient: req.body.idPatient,
        date: req.body.date,
        test_result: req.body.result
    })
    try {
        const newCard = await card.save()
        res.status(201).json(newCard)
        myLogger.log({
            message:" Card created",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    } catch (err) {
        res.status(400)
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    }
})

// Updating one 
router.patch('/:id', getCard, async (req,res) => {
    if (req.body.idPatient != null){
        res.card.id_patient = req.body.idPatient
    }
    if (req.body.date != null){
        res.card.date = req.body.date
    }
    if (req.body.result != null){
        res.card.test_result = req.body.result
    }
   
    try {
        const updatedCard = await res.card.save()
        res.json(updatedCard)
        myLogger.log({
            message:" Card updated",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    }
})

// Deleting one
router.delete('/:id', getCard, async (req,res) => {
    try {
        await res.card.remove()
        res.json({ message: 'Card Deleted'})
        myLogger.log({
            message:" Card deleted",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/cards/",
          });
    }
})


async function getCard(req, res, next){
    let card
    try{
        card = await Card.findById(req.params.id)
        if(card == null){
            return res.status(404).json({ message: 'Cannot find Card'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.card = card
    next()
}


module.exports = router