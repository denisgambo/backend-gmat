const mongoose = require("mongoose");

const entrepriseSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        logo: {
            type: String,
            required: false
        },
        slogan: {
            type: String,
            required: false
        },
        background_image_accueil: {
            type: String,
            required: false
        },
           background_image_dashbord: {
            type: String,
            required: false
        },

        telephone: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("entreprise", entrepriseSchema);

