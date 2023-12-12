const maintenancierModel = require("../models/maintenancier.model");



module.exports.createMaintenancier = async (req, res) => {
 try {
       const maintenancier = await maintenancierModel.create({
        ...req.body,
    });
    res.status(200).json(maintenancier);
 } catch (error) {
    console.log(error)
 }
}

//tous les maintenanciers
module.exports.getAllMaintenanciers = async (req, res, next) => {
    try {
        const maintenanciers = await maintenancierModel.find();
        res.status(200).json(maintenanciers);
    } catch (error) {
        next(error);
    }
}

//Supprimer un maintenancier
module.exports.supprimerMaintenanciers = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let maintenancier = await maintenancierModel.findById(id);

    if (!maintenancier) {
      return res.status(404).json({ message: "maintenancier non trouvé" });
    }

    // Supprimer l'équipement
    await maintenancierModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "maintenancier supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du maintenancier :");
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du maintenancier" });
  }
};



module.exports.modifierMaintenancier = async (req, res) => {
  const id = req.params.id;
  const nouvellesDonnees = req.body; // Les nouvelles données à mettre à jour

  try {
    // Recherchez le document par ID
    const maintenancier = await maintenancierModel.findById(id);

    if (!maintenancier) {
      return res.status(404).json({ message: "maintenancier non trouvé" });
    }

    // Mettez à jour les champs du document avec les nouvelles données
    maintenancier.nom = nouvellesDonnees.nom;
     maintenancier.prenom = nouvellesDonnees.prenom;
      maintenancier.email = nouvellesDonnees.email;
       maintenancier.genre = nouvellesDonnees.genre;
        maintenancier.telephone = nouvellesDonnees.telephone;
    // Ajoutez d'autres mises à jour ici...

    // Enregistrez les modifications
    await maintenancier.save();

    return res.status(200).json({ message: "Modifié avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite", error: error });
  }
};