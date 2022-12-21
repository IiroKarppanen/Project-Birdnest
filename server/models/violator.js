const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const violatorSchema = new Schema({
    droneSerialNumber: {
        type: String,
        required: true
    },  
    distance: {
        type: Number,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },

    timestamp: { type: Date, expires: 600, default: Date.now}

})

const Violator = mongoose.model('violator', violatorSchema)


module.exports = Violator;

