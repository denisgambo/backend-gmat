const mongoose = require("mongoose");

const consommableSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: false
        },
        prix_achat: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            required: false
        },
         observation: {
            type: String,
            required: false
        },
        categorie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: false
        },
        image_consommable: {
            type: String,
            required: false
        },
        quantite_en_stock: {
            type: Number,
            required: false
        },
          seuil_critique: {
            type: Number,
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

module.exports = mongoose.model("consommable", consommableSchema);

