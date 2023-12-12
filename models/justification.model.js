const mongoose = require("mongoose");

const justificationSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: true
        },

          description: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("justification", justificationSchema);

