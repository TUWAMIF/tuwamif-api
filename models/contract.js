var mongoose = require("mongoose");

var contractSchema = new mongoose.Schema({
    scheme: {
        type: String,
    },
    firstname: {
        type: String,
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
    },
    gender: {
        type: String,
    },
    title: {
        type: String,
    },
    nida: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    email: {
        type: Number,
    },
    postal_address: {
        type: Number,
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

