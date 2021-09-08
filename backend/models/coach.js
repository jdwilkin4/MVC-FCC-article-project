const mongoose = require('mongoose');
const { Schema } = mongoose

const coachSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true,
        unique: true
    },
    program: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    application: {
        type: Boolean,
        required: true
    },
    backgroundCheck: {
        type: Boolean,
        required: true
    },
    tbTest: {
        type: Boolean,
        required: true
    },
    covidTest: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Coach", coachSchema)

