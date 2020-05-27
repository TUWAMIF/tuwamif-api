const express = require('express');
const router = express.Router();
const moment = require('moment');
const converter = require('number-to-words');

const pdfFillForm = require('pdf-fill-form');
const nodemailer = require('nodemailer');
const fs = require('fs');


const ContractModel = require('../models/contract');



router.get('/home', function (req, res) {

    res.status(200).send('succesfully working')
});

router.post('/submit_form', function (req, res) {

    var day = moment().format('Do');

    var month = moment().format('MMMM');

    var year = moment().format('YYYY');

    var startdate = req.body.start_date

    var months = Number(req.body.end_date); //months of contribution

    var start_month = moment(startdate).format('MMMM');
    var start_year = moment(startdate).format('YYYY');
    var ending_month = moment(startdate).add(months, 'months').format('MMMM');
    var ending_year = moment(startdate).add(months, 'months').format('YYYY');

    var data;
    var gender_pronoun;
    var contract;
    var block_figure_individual;
    var percentage_individual;
    var percentage_group;
    var block_figure_group;
    var block_figure_company;

    var newContract = new ContractModel(req.body);

    newContract.save((err, res) => {
        if (!err) {
            console.log("Contract saved to the database succesfully");
        } else {
            console.log("Something Went Wrong::::::" + err)
        }

    })

    if (req.body.gender === "male") {
        gender_pronoun = "his"
    } else {
        gender_pronoun = "her"
    }

    if (req.body.contribution_model === '01-BF') {
        block_figure_individual = req.body.contribution_amount;
    }
    if (req.body.contribution_model === '01-PT') {
        percentage_individual = req.body.contribution_percentage;
    }
    if (req.body.contribution_model === '02-BF') {
        block_figure_group = req.body.contribution_amount;
    }
    if (req.body.contribution_model === '02-PT') {
        percentage_group = req.body.contribution_percentage;
    }
    if (req.body.contribution_model === '03-BF') {
        block_figure_company = req.body.contribution_amount;
    }


    if (req.body.scheme === "subsistence allowance") {
        contract = "TUWAMIF_AND_EMPLOYEE _ON_SUBSISTENCE_ALLOWANCE.pdf"

        data = {
            "title_of_the_person": req.body.title || "null",
            "name_of_the_person": req.body.firstname + " " + req.body.middlename + " " + req.body.lastname || "null",
            "contract_no": req.body.contract_number || "null",
            "day_of_agreement": day || "null",
            "month_of_agreement": month || "null",
            "year_of_agreement": year || "null",
            "firstname_of_contractor": req.body.firstname || "null",
            "secondname_of_contractor": req.body.middlename || "null",
            "lastname_of_contractor": req.body.lastname || "null",
            "nida_id_of_contractor": req.body.nida || "null",
            "employee_payment_check_number": req.body.check_number || "null",
            "contributor_gender": gender_pronoun || "null",
            "adrress_of_contractor": req.body.postal_address || "null",
            "tel1_of_contractor": req.body.phone || "null",
            "tel2_of_contractor": "" || "null",
            "email_address_of_contractor": req.body.email || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "block_figure_individual": block_figure_individual || "",
            "percentage_individual": percentage_individual || "",
            "amount_individual": "",
            "block_figure_group": block_figure_group || "",
            "percentage_group": percentage_group || "",
            "amount_group": "",
            "block_figure_company": block_figure_company || "",
            "beneficiary_firstname": req.body.beneficiary_firstname_1 || "null",
            "beneficiary_secondname": req.body.beneficiary_middlename_1 || "null",
            "baneficairy_lastname": req.body.beneficiary_lastname_1 || "null",
            "baneficiary_relation": req.body.beneficiary_relationship_1 || "null",
            "beneficiary_other_relation": "" || "null",
            "beneficiary_funding_purpose": "" || "null",
            "beneficiary_region": req.body.beneficiary_region_1 || "null",
            "beneficiary_district": req.body.beneficiary_district_1 || "null",
            "beneficiary_village": req.body.beneficiary_village_1 || "null",
            "beneficiary_telephone": req.body.beneficiary_phone_1 || "null",
            "benefits_starting_month": start_month || "null",
            "benefits_starting_year": start_year || "null",
            "benefits_ending_month": ending_month || "null",
            "benefits_ending_year": ending_year || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "months_contribution": req.body.end_date || "null",
            "contractor_gender": gender_pronoun || "null",
            "contractor_source_of_money": "" || "null",
            "employee_payement_check_number": req.body.check_number || "null",
            "contribution_amount": req.body.contribution_amount || "null",
            "monthly_services_charge": req.body.service_charge || "null",
            "total_contribution_amount": req.body.total_contribution_amount || "null",
            "months_contribution": req.body.end_date || "null",
            "contribution_amount_words": converter.toWords(req.body.contribution_amount) || "null",
            "beneficiary_firstname": req.body.beneficiary_firstname_1 || "null",
            "beneficiary_secondname": req.body.beneficiary_middlename_1 || "null",
            "beneficiary_lastname": req.body.beneficiary_lastname_1 || "null",
            "beneficiary_relation": req.body.beneficiary_relationship_1 || "null",
            "beneficiary_region": req.body.beneficiary_region_1 || "null",
            "beneficiary_district": req.body.beneficiary_district_1 || "null",
            "beneficiary_village": req.body.beneficiary_village_1 || "null",
            "beneficiary_telephone": req.body.beneficiary_phone_1 || "null",
            "beneficiary2_firstname": req.body.beneficiary_firstname_2 || "null",
            "beneficiary2_secondname": req.body.beneficiary_middlename_2 || "null",
            "beneficiary2_lastname": req.body.beneficiary_lastname_2 || "null",
            "beneficiary2_relation": req.body.beneficiary_relationship_2 || "null",
            "beneficiary2_region": req.body.beneficiary_region_2 || "null",
            "beneficiary2_district": req.body.beneficiary_district_2 || "null",
            "beneficiary2_village": req.body.beneficiary_village_2 || "null",
            "beneficiary2_telephone": req.body.beneficiary_phone_2 || "null",
            "beneficiary3_firstname": req.body.beneficiary_firstname_3 || "null",
            "beneficiary3_secondname": req.body.beneficiary_middlename_3 || "null",
            "beneficiary3_lastname": req.body.beneficiary_lastname_3 || "null",
            "beneficiary3_relation": req.body.beneficiary_relationship_3 || "null",
            "beneficiary3_region": req.body.beneficiary_region_3 || "null",
            "beneficiary3_district": req.body.beneficiary_district_3 || "null",
            "beneficiary3_village": req.body.beneficiary_village_3 || "null",
            "beneficiary3_telephone": req.body.beneficiary_phone_3 || "null",
            "beneficiary_project_name": "" || "null",
            "beneficiary_project_region": "" || "null",
            "beneficiary_project_district": "" || "null",
            "beneficiary_project_village": "" || "null",
            "beneficiary_project_telephone": "",
        }
    }

    if (req.body.scheme === "education support") {

        contract = "TUWAMIF_AND_EMPLOYEE _ON_EDUCATION_ALLOWANCE.pdf"
        data = {

            "title_of_the_person": req.body.title || "null",
            "name_of_the_person": req.body.firstname + " " + req.body.middlename + " " + req.body.lastname || "null",
            "contract_no": req.body.contract_number || "null",
            "day_of_agreement": day || "null",
            "month_of_agreement": month || "null",
            "year_of_agreement": year || "null",
            "firstname_of_contractor": req.body.firstname || "null",
            "secondname_of_contractor": req.body.middlename || "null",
            "lastname_of_contractor": req.body.lastname || "null",
            "nida_id_of_contractor": req.body.nida || "null",
            "employee_payment_check_number": req.body.check_number || "null",
            "contributor_gender": gender_pronoun || "null",
            "adrress_of_contractor": req.body.postal_address || "null",
            "tel1_of_contractor": req.body.phone || "null",
            "tel2_of_contractor": "" || "null",
            "email_address_of_contractor": req.body.email || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "block_figure_individual": block_figure_individual || "",
            "percentage_individual": percentage_individual || "",
            "amount_individual": "",
            "block_figure_group": block_figure_group || "",
            "percentage_group": percentage_group || "",
            "amount_group": "",
            "block_figure_company": block_figure_company || "",
            "beneficiary_firstname": req.body.beneficiary_firstname_1 || "null",
            "beneficiary_secondname": req.body.beneficiary_middlename_1 || "null",
            "baneficairy_lastname": req.body.beneficiary_lastname_1 || "null",
            "baneficiary_relation": req.body.beneficiary_relationship_1 || "null",
            "beneficiary_other_relation": "" || "null",
            "beneficiary_funding_purpose": "" || "null",
            "beneficiary_region": req.body.beneficiary_region_1 || "null",
            "beneficiary_district": req.body.beneficiary_district_1 || "null",
            "beneficiary_village": req.body.beneficiary_village_1 || "null",
            "beneficiary_telephone": req.body.beneficiary_phone_1 || "null",
            "benefits_starting_month": start_month || "null",
            "benefits_starting_year": start_year || "null",
            "benefits_ending_month": ending_month || "null",
            "benefits_ending_year": ending_year || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "months_contribution": req.body.end_date || "null",
            "contractor_gender": gender_pronoun || "null",
            "contractor_source_of_money": "" || "null",
            "employee_payement_check_number": req.body.check_number || "null",
            "contribution_amount": req.body.contribution_amount || "null",
            "monthly_services_charge": req.body.service_charge || "null",
            "total_contribution_amount": req.body.total_contribution_amount || "null",
            "months_contribution": req.body.end_date || "null",
            "contribution_amount_words": converter.toWords(req.body.contribution_amount) || "null",
            "beneficiary_firstname": req.body.beneficiary_firstname_1 || "null",
            "beneficiary_secondname": req.body.beneficiary_middlename_1 || "null",
            "beneficiary_lastname": req.body.beneficiary_lastname_1 || "null",
            "beneficiary_relation": req.body.beneficiary_relationship_1 || "null",
            "beneficiary_region": req.body.beneficiary_region_1 || "null",
            "beneficiary_district": req.body.beneficiary_district_1 || "null",
            "beneficiary_village": req.body.beneficiary_village_1 || "null",
            "beneficiary_telephone": req.body.beneficiary_phone_1 || "null",
            "beneficiary2_firstname": req.body.beneficiary_firstname_2 || "null",
            "beneficiary2_secondname": req.body.beneficiary_middlename_2 || "null",
            "beneficiary2_lastname": req.body.beneficiary_lastname_2 || "null",
            "beneficiary2_relation": req.body.beneficiary_relationship_2 || "null",
            "beneficiary2_region": req.body.beneficiary_region_2 || "null",
            "beneficiary2_district": req.body.beneficiary_district_2 || "null",
            "beneficiary2_village": req.body.beneficiary_village_2 || "null",
            "beneficiary2_telephone": req.body.beneficiary_phone_2 || "null",
            "beneficiary3_firstname": req.body.beneficiary_firstname_3 || "null",
            "beneficiary3_secondname": req.body.beneficiary_middlename_3 || "null",
            "beneficiary3_lastname": req.body.beneficiary_lastname_3 || "null",
            "beneficiary3_relation": req.body.beneficiary_relationship_3 || "null",
            "beneficiary3_region": req.body.beneficiary_region_3 || "null",
            "beneficiary3_district": req.body.beneficiary_district_3 || "null",
            "beneficiary3_village": req.body.beneficiary_village_3 || "null",
            "beneficiary3_telephone": req.body.beneficiary_phone_3 || "null"


        }
    }

    if (req.body.scheme === "child support") {

        contract = "TUWAMIF_AND_EMPLOYEE_CHILD_SUPPORT_ALLOWANCE.pdf"

        var data = {
            "title_of_the_person": req.body.title || "null",
            "name_of_the_person": req.body.firstname + " " + req.body.middlename + " " + req.body.lastname || "null",
            "contract_no": req.body.contract_number || "null",
            "day_of_agreement": day || "null",
            "month_of_agreement": month || "null",
            "year_of_agreement": year || "null",
            "firstname_of_contractor": req.body.firstname || "null",
            "secondname_of_contractor": req.body.middlename || "null",
            "lastname_of_contractor": req.body.lastname || "null",
            "nida_id_of_contractor": req.body.nida || "null",
            "employee_payment_check_number": req.body.check_number || "null",
            "contributor_gender": gender_pronoun || "null",
            "adrress_of_contractor": req.body.postal_address || "null",
            "tel1_of_contractor": req.body.phone || "null",
            "tel2_of_contractor": "" || "null",
            "email_address_of_contractor": req.body.email || "null",
            "block_figure_individual": block_figure_individual || "",
            "percentage_individual": percentage_individual || "",
            "amount_individual": "",
            "block_figure_group": block_figure_group || "",
            "percentage_group": percentage_group || "",
            "amount_group": "",
            "block_figure_company": block_figure_company || "",
            "case_number": "" || "null",
            "case_year": "" || "null",
            "court_name": "" || "null",
            "complainant_firstname": "" || "null",
            "complainant_secondname": "" || "null",
            "complainant_lastname": "" || "null",
            "complainant_realtion_to_accused": "" || "null",
            "complainant_relation_period": "" || "null",
            "accused_first_name": "" || "null",
            "accused_second_name": "" || "null",
            "accused_last_name": "" || "null",
            "children1_firsname": "" || "null",
            "children1_secondname": "" || "null",
            "children1_lastname": "" || "null",
            "son_daughter1": "" || "null",
            "children2_firstname": "" || "null",
            "children2_secondname": "" || "null",
            "children2_lastname": "" || "null",
            "son_daughter2": "" || "null",
            "children3_firstname": "" || "null",
            "children3_secondname": "" || "null",
            "children3_lastname": "" || "null",
            "son_daughter3": "" || "null",
            "children4_firstname": "" || "null",
            "children4_secondname": "" || "null",
            "children4_lastname": "" || "null",
            "son_daughter4": "" || "null",
            "benefits_starting_month": start_month || "null",
            "benefits_starting_year": start_year || "null",
            "benefits_ending_month": ending_month || "null",
            "benefits_ending_year": ending_year || "null",
            "benefits_ending_year": "" || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "months_contribution": req.body.end_date || "null",
            "contributor_gender": gender_pronoun || "null",
            "contractor_source_of_money": "" || "null",
            "employee_payement_check_number": req.body.check_number || "null",
            "contribution_amount": req.body.contribution_amount || "null",
            "monthly_services_charge": req.body.service_charge || "null",
            "total_contribution_amount": req.body.total_contribution_amount || "null",
            "months_contribution": req.body.end_date || "null",
            "contribution_amount_words": converter.toWords(req.body.contribution_amount) || "null",
            "contribution_amount": req.body.contribution_amount || "null",
            "receiver_relation_to_contributor": "" || "null",
            "beneficiary_gender": "" || "null",
            "beneficiary_address": ""


        }
    }

    if (req.body.scheme === "fixed deposit") {

        contract = "TUWAMIF_AND_EMPLOYEE_ON_FIXED_DEPOSIT_ALLOWANCE.pdf"

        var data = {
            "title_of_the_person": req.body.title || "null",
            "name_of_the_person": req.body.firstname + " " + req.body.middlename + " " + req.body.lastname || "null",
            "contract_no": req.body.contract_number || "null",
            "day_of_agreement": day || "null",
            "month_of_agreement": month || "null",
            "year_of_agreement": year || "null",
            "region_of_agreement": "",
            "firstname_of_contractor": req.body.firstname || "null",
            "secondname_of_contractor": req.body.middlename || "null",
            "lastname_of_contractor": req.body.lastname || "null",
            "nida_id_of_contractor": req.body.nida || "null",
            "employee_payment_check_number": req.body.check_number || "null",
            "contributor_gender": gender_pronoun || "null",
            "adrress_of_contractor": req.body.postal_address || "null",
            "tel1_of_contractor": req.body.phone || "null",
            "tel2_of_contractor": "" || "null",
            "email_address_of_contractor": req.body.email || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "beneficiary_firstname": req.body.beneficiary_firstname_1 || "null",
            "beneficiary_secondname": req.body.beneficiary_middlename_1 || "null",
            "baneficairy_lastname": req.body.beneficiary_lastname_1 || "null",
            "employee_of": "",
            "beneficiary_relation": "",
            "beneficiary_relation": "",
            "region_of_inv_project": "",
            "district_of_inv_project": "",
            "village_of_inv_project": "",
            "tel_of_inv_project": "",
            "benefits_starting_month": start_month || "null",
            "benefits_starting_year": start_year || "null",
            "benefits_ending_month": ending_month || "null",
            "benefits_ending_year": ending_year || "null",
            "where_the_contractor_work": req.body.organization || "null",
            "months_contribution": req.body.end_date || "null",
            "contractor_source_of_money": "" || "null",
            "employee_payement_check_number": req.body.check_number || "null",
            "contribution_amount": req.body.contribution_amount || "null",
            "monthly_services_charge": req.body.service_charge || "null",
            "total_contribution_amount": req.body.total_contribution_amount || "null",
            "months_contribution": req.body.end_date || "null",
            "contribution_amount_words": converter.toWords(req.body.contribution_amount) || "null",
            "block_figure_individual": block_figure_individual || "",
            "percentage_individual": percentage_individual || "",
            "amount_individual": "",
            "block_figure_group": block_figure_group || "",
            "percentage_group": percentage_group || "",
            "amount_group": ""
        }


    }

    pdfFillForm.write(`./contracts/${contract}`, data, {
        "save": "pdf",
        'cores': 4,
        'scale': 0.2,
        'antialias': true
    })
        .then(function (result) {
            fs.writeFile("ready.pdf", result, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");

                var receiver = 'josephmichaeltest@gmail.com'
                var message = `<h2>CONTRACT FORM SUBMISSION</h2>`


                // var transporter = nodemailer.createTransport(smtpTransport({

                //     host: 'r200.websiteservername.com',
                //     port: 465,
                //     secure: true,
                //     auth: {
                //         user: 'info@tuwamif.com',
                //         pass: 'info@tuwamif.com'
                //     },
                //     tls: {
                //         // do not fail on invalid certs
                //         rejectUnauthorized: false
                //     }
                // }));


                var transporter = nodemailer.createTransport({

                    sendMail: true,
                    host: "r200.websiteservername.com",
                    port: 465,
                    secure: true, // use TLS
                    auth: {
                        user: "info@tuwamif.com",
                        pass: "info@tuwamif.com"
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });

                // verify connection configuration
                transporter.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Server is ready to take our messages');
                    }
                });

                var mailOptions = {
                    from: "info@tuwamif.com",
                    to: receiver,
                    subject: 'NEW CONTRACT !!!!',
                    html: message,
                    attachments: { // file on disk as an attachment
                        filename: 'contract.pdf',
                        path: './ready.pdf'
                        // stream this file
                    }
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);

                    }
                });


            });
        }, function (err) {
            console.log(err);
        });


})

module.exports = router;
