var mongoose = require("mongoose");


var proposeSchema = new mongoose.Schema({

    proposer_name: {
        type: String
    },
    proposer_phone: {
        type: String
    },
    proposer_email: {
        type: String
    },
    proposed_name: {
        type: String
    },
    proposed_phone: {
        type: String
    },
    proposed_email: {
        type: String
    }

})

var Propose = module.exports = mongoose.model("Propose", proposeSchema);