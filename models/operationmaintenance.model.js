const mongoose = require("mongoose");

const operationMaintenanceSchema = mongoose.Schema(
    {
        equipement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "equipements",
            required: true
        },
        horametre: {
            type: Number,
            required: false
        },
        anomalie: {
            type: [String],
            required: false
        },
        actions_realisees:{
            type:String,
            require:false
        },
          motif: {
            type: String,
            required: false
        },
        consommation: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "consommables",
            required: false
        }],

         autres_depenses: [{
        designation: { 
            type: String,
            required: true
        },
        montant: { 
            type: Number,
            required: true
        }
    }],
        date_entree: {
            type: Date,
            required: false
        },
        date_sortie: {
            type: Date,
            required: false
        },
        operateur_maintenance: {
            type: [String],
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

module.exports = mongoose.model("maintenance", operationMaintenanceSchema);

