const mongoose = require("mongoose");

const categorieConsommableSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        code_categorie: {
            type: String,
            required: false
        },

        image_categorie: {
            type: String,
            required: false
        },
        code_qr: {
            type: String,
            required: false
        },
        code_bar: {
            type: String,
            required: false
        }


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("categorieConsommable", categorieConsommableSchema);

