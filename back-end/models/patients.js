const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true 
    },
    last_name: {
        type: String,
        required: true 
    },
    cin: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    phone: {
        type: String,
        required: true 
    }
})


module.exports = mongoose.model('Patient', patientSchema)