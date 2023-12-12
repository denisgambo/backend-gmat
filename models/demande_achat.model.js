const mongoose = require("mongoose");

const demandeAchatSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: false
        },


        date_emission: {
            type: Date,
             default: new Date().toISOString(), // Utilisez default pour définir la date à la valeur actuelle
            required: false
        },
        validation_status:{
            type:String,
            default:"en_cours",
            required:false
        },
        date_validation: {
            type: Date,
            required: false
        },
         emetteur: {
            type: Object,
            required: false
        },
         validateur: {
            type: Object,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("demandeAchat", demandeAchatSchema);

