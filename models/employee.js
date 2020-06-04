const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    employee_name: {
        type: String
    },
    employee_reference_id: {
        type: String
    },
    employee_designation: {
        type: String
    },
    employee_email: {
        type: String
    },
    employee_address: {
        type: String
    }

})


var Employee = module.exports = mongoose.model("Employee", employeeSchema);