const serviceModel = require("../models/service.model");

//Créer un service

module.exports.createService = async (req, res) => {
 try {
       const service = await serviceModel.create({
        ...req.body,
    });
    res.status(200).json(service);
 } catch (error) {
    console.log(error)
 }
};

//tous les service
module.exports.getServices= async (req, res, next) => {
    try {
        const services = await serviceModel.find();
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};

//Supprimer un utilisateur
module.exports.supprimerService = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID
  console.log(id)

  try {
    // Recherche du service par son ID
    let service = await serviceModel.findById(id);

    if (!service) {
      return res.status(404).json({ message: "service non trouvé" });
    }

    // Supprimer le service
    await serviceModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "service supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du service :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du service " });
  }
};



//selectionner un service par id
module.exports.getServiceById = async (req, res) => {
  const id = req.params.id;

  try {
    let service = await serviceModel.findById(id);

    if (service) {
      res.status(200).json({ service });
    } else {
      res.status(404).json({ message: "service non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du service." });
  }
};

module.exports.modifierService = async (req, res) => {
  const id = req.params.id;
  const nouvellesDonnees = req.body; // Les nouvelles données à mettre à jour

  try {
    // Recherchez le document par ID
    const service = await serviceModel.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }

    // Mettez à jour les champs du document avec les nouvelles données
    service.nom = nouvellesDonnees.nom;
    // Ajoutez d'autres mises à jour ici...

    // Enregistrez les modifications
    await service.save();

    return res.status(200).json({ message: "Modifié avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite", error: error });
  }
};
