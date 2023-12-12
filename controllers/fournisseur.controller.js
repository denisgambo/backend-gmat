//create un utilisateur
const fournisseurSchema = require("../models/fournisseur.model");
module.exports.createFournisseur = async (req, res) => {
    console.log(req.body);
    const fournisseur = await fournisseurSchema.create({
        ...req.body
       
    });
    res.status(200).json(fournisseur);
}


module.exports.getAllFournisseurs = async (req, res, next) => {
    try {
        const fournisseurs = await fournisseurSchema.find();
        res.status(200).json(fournisseurs);
    } catch (error) {
        next(error);
    }
};

module.exports.updateFournisseur = async (req, res) => {
    const { id } = req.params.id; // Supposons que vous recevez l'ID du fournisseur à mettre à jour
    const updates = req.body; // Les champs à mettre à jour

    try {
        const fournisseur = await fournisseurSchema.findByIdAndUpdate(id, updates, { new: true });
        if (!fournisseur) {
            return res.status(404).json({ message: "Fournisseur non trouvé" });
        }
        res.status(200).json(fournisseur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du fournisseur", error: error.message });
    }
};

module.exports.deleteFournisseur = async (req, res) => {
    const { id } = req.params; // Supposons que vous recevez l'ID du fournisseur à supprimer
    try {
        const fournisseur = await fournisseurSchema.findByIdAndDelete(id);
        if (!fournisseur) {
            return res.status(404).json({ message: "Fournisseur non trouvé" });
        }
        res.status(200).json({ message: "Fournisseur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du fournisseur", error: error.message });
    }
};

