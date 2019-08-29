const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricsSchema = new Schema({
    empId:{
        type: String,
        required: true
    },
    punctuality: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    execution: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    learning: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    teamCooperation: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    responsibility: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    pdfUrl: {
        type: String,
        required: true
    }
});

module.exports = Metrics = mongoose.model('metrics', MetricsSchema);