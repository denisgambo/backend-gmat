const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("service", serviceSchema);

