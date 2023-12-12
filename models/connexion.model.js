const mongoose = require("mongoose");

const connexionSchema = mongoose.Schema(
    {     
     
        date_connexion: {
            type: Date,
            required: false
        },
        date_deconnexion: {
            type: Date,
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

module.exports = mongoose.model("connexion", connexionSchema);

