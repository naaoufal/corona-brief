const express = require('express')
const router = express.Router()
const Survey = require('../models/surveys')
const winston = require('winston')

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
        const surveys = await Survey.find()
        res.send(surveys)
        myLogger.log({
            message:" Surveys found",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/surveys/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/Surveys/",
          });
    }
})

// Getting one
router.get('/:id', getSurvey, (req,res) => {
    res.json(res.survey)
})

//Get one by patient id
router.get('/findsurveybypatient/:idpatient', async (req,res) => {
    try{
        const surveys = await Survey.find({}).where('id_patient').equals(req.params.idpatient)
        res.send(surveys)
        myLogger.log({
            message:" Survey found",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/surveys/findsurveybypatient/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/surveys/findsurveybypatient/",
          });
    }
})

// Creating one
router.post('/', async (req,res) => {
    const survey = new Survey({
        id_patient: req.body.idPatient,
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
        q7: req.body.q7,
        q8: req.body.q8,
        q9: req.body.q9,
        q10: req.body.q10,
        q11: req.body.q11,
        q12: req.body.q12
    })
    try {
        const newSurvey = await survey.save()
        res.status(201).json(newSurvey)
        myLogger.log({
            message:" Survey created",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/surveys/",
          });
    } catch (err) {
        res.status(400)
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/Surveys/",
          });
    }
})

// Updating one 
router.patch('/:id', getSurvey, async (req,res) => {
    if (req.body.idPatient != null){
        res.survey.id_patient = req.body.idPatient
    }
    if (req.body.q1 != null){
        res.survey.q1 = req.body.q1
    }
    if (req.body.q2 != null){
        res.survey.q2 = req.body.q2
    }
    if (req.body.q3 != null){
        res.survey.q3 = req.body.q3
    }
    if (req.body.q4 != null){
        res.survey.q4 = req.body.q4
    }
    if (req.body.q5 != null){
        res.survey.q5 = req.body.q5
    }
    if (req.body.q6 != null){
        res.survey.q6 = req.body.q6
    }
    if (req.body.q7 != null){
        res.survey.q7 = req.body.q7
    }
    if (req.body.q8 != null){
        res.survey.q8 = req.body.q8
    }
    if (req.body.q9 != null){
        res.survey.q9 = req.body.q9
    }
    if (req.body.q10 != null){
        res.survey.q10 = req.body.q10
    }
    if (req.body.q11 != null){
        res.survey.q11 = req.body.q11
    }
    if (req.body.q12 != null){
        res.survey.q12 = req.body.q12
    }
    
   
    try {
        const updatedSurvey = await res.survey.save()
        res.json(updatedSurvey)
        myLogger.log({
            message:" Survey updated",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/surveys//",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/Surveys/",
          });
    }
})

// Deleting one
router.delete('/:id', getSurvey, async (req,res) => {
    try {
        await res.survey.remove()
        res.json({ message: 'Survey Deleted'})
        myLogger.log({
            message:" Survey Deleted",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/surveys/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/Surveys/",
          });
    }
})




async function getSurvey(req, res, next){
    let survey
    try{
        survey = await Survey.findById(req.params.id)
        if(survey == null){
            return res.status(404).json({ message: 'Cannot find survey'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.survey = survey
    next()
}

module.exports = router