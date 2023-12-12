const mongoose = require("mongoose");

const localisationSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("localisation", localisationSchema);

