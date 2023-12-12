const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        login: {
            type: String,
            required: true,
            unique:true
        },

         genre: {
            type: String,
            required: false
        },

        mot_de_passe: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            
        },
          email: {
            type: String,
            required: false,
            unique:true
        },
         telephone: {
            type: String,
            required: false,
            unique:true
        },

        photo_profil: {
            type: String,
            required: false
        },
        autoriser: {
            type: Boolean,
            required: false
        },
    },
    {
        timestamps: true,
    }
)
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("utilisateur", userSchema);

