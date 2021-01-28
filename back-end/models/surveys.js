const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    id_patient: {
        type: String,
        required: true 
    },
    q1: {
        type: Boolean,
        required: true 
    },
    q2: {
        type: Boolean,
        required: true 
    },
    q3: {
        type: Boolean,
        required: true 
    },
    q4: {
        type: Boolean,
        required: true 
    },
    q5: {
        type: Boolean,
        required: true 
    },
    q6: {
        type: Boolean,
        required: true 
    },
    q7: {
        type: Boolean,
        required: true 
    },
    q8: {
        type: Boolean,
        required: true 
    },
    q9: {
        type: Boolean,
        required: true 
    },
    q10: {
        type: Boolean,
        required: true 
    },
    q11: {
        type: Boolean,
        required: true 
    },
    q12: {
        type: Boolean,
        required: true 
    }
})


module.exports = mongoose.model('Survey', surveySchema)