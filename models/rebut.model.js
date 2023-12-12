const mongoose = require("mongoose");

const rebutSchema = mongoose.Schema(
    {
        date: {
            type: String,
            default: new Date().toISOString(), // Utilisez default pour définir la date à la valeur actuelle
            required: true
        },
        equipement: {
            type: Object,
            required: true
        },

          utilisateur: {
            type: Object,
            required: true
        },
        raison: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("rebut", rebutSchema);
