const mongoose = require("mongoose");

const approvisionnementSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: false
        },


        date_commande: {
            type: Date,
            required: false
        },
        date_reception: {
            type: Date,
            required: false
        },
         utilisateur: {
            type: Object,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("approvisionnement", approvisionnementSchema);

