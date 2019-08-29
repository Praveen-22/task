const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    empName:{
        type: String,
        required: true
    },
    empGender: {
        type: String,
        required: true
    },
    empMail: {
        type: String,
        required: true
    },
    empPhone: {
        type: Number,
        required: true
    },
    empDOB: {
        type: String,
        required: true
    },
    empRole: {
        type: String,
        required: true
    }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);