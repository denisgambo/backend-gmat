const mongoose = require("mongoose");

const ligneDemandeAchatSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: false
        },

        consommable: {
             type: Object,
            
            required: true
        },
          demande_achat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "demandeAchats",
            required: false
        },

        quantite: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("ligneDemandeAchat", ligneDemandeAchatSchema);

