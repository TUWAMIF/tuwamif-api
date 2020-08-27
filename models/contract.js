var mongoose = require("mongoose");
var EmpolyeeModel = require('./employee');

var contractSchema = new mongoose.Schema({
    scheme: {
        type: String,
        required: [true, "Scheme type required"]
    },
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    middlename: {
        type: String,
        required: [true, "Middle name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"]
    },
    gender: {
        type: String,

    },
    title: {
        type: String,
    },
    nida: {
        type: String,
        required: [true, "Nida ID is required"]
    },
    phone: {
        type: Number,

    },
    email: {
        type: String,
    },
    postal_address: {
        type: String,
    },
    employee: {
        type: String,
    },
    employee_type: {
        type: String,
    },
    check_number: {
        type: String,
    },
    organization: {
        type: String,
    },
    department_name: { 
        type: String,
    },
    tenure_duration: {
        type: Number,
    },
    referrer_id: {
        type: String,
        validate: {
            validator: function (v, callback) {

                return new Promise(function (resolve, reject) {

                    EmpolyeeModel.find({ employee_id_number: v }, function (err, res) {

                        if (res === []) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    })
                })
            },
            message: ref => `Referrer ID: '${ref.value}' can not be found`
        },
        required: [true, "Referrer ID is required"]
    },
    hr_name: {
        type: String
    },
    hr_emal: {
        type: String
    },
    hr_phone: {
        type: String
    },
    hr_designation: {
        type: String
    },
    beneficiary_firstname_1: {
        type: String
    },
    beneficiary_middlename_1: {
        type: String
    },
    beneficiary_lastname_1: {
        type: String
    },
    beneficiary_relationship_1: {
        type: String
    },
    beneficiary_phone_1: {
        type: String
    },
    beneficiary_region_1: {
        type: String
    },
    beneficiary_district_1: {
        type: String
    },
    beneficiary_village_1: {
        type: String
    },
    beneficiary_firstname_2: {
        type: String
    },
    beneficiary_middlename_2: {
        type: String
    },
    beneficiary_lastname_2: {
        type: String
    },
    beneficiary_relationship_2: {
        type: String
    },
    beneficiary_phone_2: {
        type: String
    },
    beneficiary_region_2: {
        type: String
    },
    beneficiary_district_2: {
        type: String
    },
    beneficiary_village_2: {
        type: String
    },
    beneficiary_firstname_3: {
        type: String
    },
    beneficiary_middlename_3: {
        type: String
    },
    beneficiary_lastname_3: {
        type: String
    },
    beneficiary_relationship_3: {
        type: String
    },
    beneficiary_phone_3: {
        type: String
    },
    beneficiary_region_3: {
        type: String
    },
    beneficiary_district_3: {
        type: String
    },
    beneficiary_village_3: {
        type: String
    },

});

var Contract = module.exports = mongoose.model("Contract", contractSchema);

