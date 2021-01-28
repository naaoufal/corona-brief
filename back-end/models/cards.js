const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    id_patient: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        required: true 
    },
    test_result: {
        type: String,
        required: true 
    }
})




module.exports = mongoose.model('Card', cardSchema)