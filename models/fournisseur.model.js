const mongoose = require("mongoose");

const fournisseurSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },



    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("fournisseur", fournisseurSchema);

