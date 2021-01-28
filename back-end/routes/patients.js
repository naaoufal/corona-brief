const express = require('express')
const router = express.Router()
const Patient = require('../models/patients')
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
        const patients = await Patient.find()
        res.send(patients)
        myLogger.log({
            message:" Patients found",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    }
})

// Getting one
router.get('/:id', getPatient, (req,res) => {
    res.json(res.patient)
})

// Creating one
router.post('/', async (req,res) => {
    const patient = new Patient({
        first_name: req.body.fname,
        last_name: req.body.lname,
        cin: req.body.cin,
        email: req.body.email,
        phone: req.body.phone
    })
    try {
        const newPatient = await patient.save()
        res.status(201).json(newPatient)
        myLogger.log({
            message:" Patient created",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    } catch (err) {
        res.status(400)
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    }
})

// Updating one 
router.patch('/:id', getPatient, async (req,res) => {
    if (req.body.efname != null){
        res.patient.first_name = req.body.efname
    }
    if (req.body.elname != null){
        res.patient.last_name = req.body.elname
    }
    if (req.body.ecin != null){
        res.patient.cin = req.body.ecin
    }
    if (req.body.eemail != null){
        res.patient.email = req.body.eemail
    }
    if (req.body.ephone != null){
        res.patient.phone = req.body.ephone
    }
    try {
        const updatedPatient = await res.patient.save()
        res.json(updatedPatient)
        myLogger.log({
            message:" Patient updated",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    }
})

// Deleting one
router.delete('/:id', getPatient, async (req,res) => {
    try {
        await res.patient.remove()
        res.json({ message: 'Patient Deleted'})
        myLogger.log({
            message:" Patient Deleted",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    } catch (err) {
        res.status(500).json({ message: err.message})
        myLogger.log({
            message: err.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
            http: "localhost:" + 3000 + "/patients/",
          });
    }
})

async function getPatient(req, res, next){
    let patient
    try{
        patient = await Patient.findById(req.params.id)
        if(patient == null){
            return res.status(404).json({ message: 'Cannot find patient'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
        
        
    }
    res.patient = patient
    next()
}

module.exports = router