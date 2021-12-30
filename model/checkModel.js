const mongoose = require('mongoose');

const checkIn = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    check:{
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const CheckIn = mongoose.model('CheckIn',checkIn );
module.exports = CheckIn;