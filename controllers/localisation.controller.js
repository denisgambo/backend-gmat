//create un utilisateur
const localisationSchema = require("../models/localisation.model");
module.exports.createLocalisation = async (req, res) => {
    console.log("Créer un user");
    const localisation = await localisationSchema.create({
        nom: req.body.nom,
        description: req.body.description,
    });
    res.status(200).json(localisation);
}


module.exports.getAllLocalite = async (req, res, next) => {
    try {
        const localites = await localisationSchema.find();
        res.status(200).json(localites);
    } catch (error) {
        next(error);
    }
};