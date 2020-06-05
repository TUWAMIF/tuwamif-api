const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var employeeSchema = mongoose.Schema({
    employee_name: {
        type: String
    },
    employee_id_number: {
        type: String,
        required: [true, 'ID Number is required '],
        unique: true

    },
    employee_designation: {
        type: String
    },
    employee_email: {
        type: String
    },
    employee_address: {
        type: String
    },
    location: {
        type: String
    },
    signature_path: {
        type: String
    }

})

employeeSchema.plugin(uniqueValidator, { message: 'Error, The {PATH} : {VALUE} is already registered !!' });

var Employee = module.exports = mongoose.model("Employee", employeeSchema);

module.exports.findEmployee = (employee_number) => {

    return new Promise(function (resolve, reject) {
        Employee.find({ employee_id_number: employee_number }, function (err, res) {

            if (err) reject(err)

            resolve(res)

        })
    })
}

