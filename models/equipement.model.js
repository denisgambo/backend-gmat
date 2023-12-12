const mongoose = require("mongoose");

const equipementSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        reference: {
            type: String,
            required: false
        },
          numero_serie: {
            type: String,
            required: false
        },

          au_rebut: {
            type: Boolean,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        categorie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: false
        },
           service: {
            type: String,
            required: false
        },

          fournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fournisseurs",
            required: false
        },

        code_inventaire: {
            type: String,
            required: false
        },
        image_equipement: {
            type: String,
            required: false
        },
        marque: {
            type: String,
            required: false
        },
        observation: {
            type: String,
            required: false
        },

        localite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "localisations",
            required: false
        },
        date_acquisition: {
            type: Date,
            required: false
        },
        date_mise_en_service: {
            type: Date,
            required: false
        },
        disponibilite: {
            type: Boolean,
            required: false
        },
        code_qr: {
            type: String,
            required: false
        },
        code_bar: {
            type: String,
            required: false
        },
        


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("equipement", equipementSchema);

