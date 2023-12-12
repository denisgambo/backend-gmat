const mongoose = require("mongoose");

const consommationSchema = mongoose.Schema(
    {
        equipement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "equipements",
            required: true
        },
        description: {         // ou justifications justification
            type: [String],
            required: false
        },
        date: {
            type: Date,
            required: true
        },

        consommable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "consommables",
            required: true
        },
        quantite: {
            type: Number,
            required: false
        },
         hora: {
            type: Number,
            required: false
        },

          quantite_restante: {
            type: Number,
            required: false
        },
          quantite_depart: {
            type: Number,
            required: false
        },
        utilisateur:{
            type:Object,
            required:true
        }


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("consommation", consommationSchema);

