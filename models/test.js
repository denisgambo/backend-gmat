const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
     

        photo_profil: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("test", testSchema);

