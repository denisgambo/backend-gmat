const mongoose = require("mongoose");

const ligneApprovisionnementSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: false
        },

        consommable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "consommables",
            required: false
        },
          approvisionnement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "approvisionnements",
            required: false
        },

        fournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fournisseurs",
            required: false
        },
        quantite: {
            type: Number,
            required: false
        },
        prix_unitaire: {
            type: Number,
            required: false
        },
        prix_total: {
            type: Number,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("ligneapprovisionnement", ligneApprovisionnementSchema);

