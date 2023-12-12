const mongoose = require("mongoose");
//create un utilisateur
const ligneApprovisionnementSchema = require("../models/ligneapprovisionnement.model")
/* module.exports.createLigneApprovisionnement = async (req, res) => {
    console.log("Créer un categorie");
    const ligneapp = await ligneApprovisionnementSchema.create({
        description: req.body.description,
        consommable: req.body.consommable,
        fournisseur: req.body.fournisseur,
        quantite: req.body.quantite,
        prix_unitaire: req.body.prix_unitaire,
        prix_total: req.body.prix_total,
    });
    res.status(200).json(ligneapp);
} */

module.exports.createLigneApprovisionnement = async (req, res) => {
    const ligneapp = await ligneApprovisionnementSchema.create({
        ...req.body,
    });
    res.status(200).json(ligneapp);
};