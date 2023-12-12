const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const maintenancierSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
    

         genre: {
            type: String,
            required: false
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
    },
    {
        timestamps: true,
    }
)
maintenancierSchema.plugin(uniqueValidator);

module.exports = mongoose.model("maintenancier", maintenancierSchema);

