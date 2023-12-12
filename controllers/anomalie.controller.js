const anomalieModel = require("../models/anomalie.model");

// const anomalieSchema = require("../models/an.model");


//Créer un service

module.exports.createAnomalie = async (req, res) => {
 try {
       const anomalie = await anomalieModel.create({
        ...req.body,
    });
    res.status(200).json(anomalie);
 } catch (error) {
    console.log(error)
 }
};

//tous les service
module.exports.getAnomalies= async (req, res, next) => {
    try {
        const anomalies = await anomalieModel.find();
        res.status(200).json(anomalies);
    } catch (error) {
        next(error);
    }
};

//Supprimer une anomalie
module.exports.supprimerAnomalies = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID
  console.log(id)

  try {
    // Recherche de l'anomalie par son ID
    let anomalie = await anomalieModel.findById(id);

    if (!anomalie) {
      return res.status(404).json({ message: "anomalie non trouvé" });
    }

    // Supprimer l anomalie
    await anomalieModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "anomalie supprimée avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de l'anomalie :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'anomalie " });
  }
};



//selectionner une anomalie par id
module.exports.getAnomalieById = async (req, res) => {
  const id = req.params.id;

  try {
    let anomalie = await anomalieModel.findById(id);

    if (anomalie) {
      res.status(200).json({ anomalie });
    } else {
      res.status(404).json({ message: "anomalie non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'anomalie." });
  }
};



module.exports.modifierAnnomalie = async (req, res) => {
  const id = req.params.id;
  const nouvellesDonnees = req.body; // Les nouvelles données à mettre à jour
  console.log("Body: ", nouvellesDonnees)
   console.log("id: ", id)

  try {
    // Recherchez le document par ID
    const annomalie = await anomalieModel.findById(id);

    if (!annomalie) {
      return res.status(404).json({ message: "Annomalie non trouvée" });
    }

    // Mettez à jour les champs du document avec les nouvelles données
    annomalie.nom = nouvellesDonnees.nom;
        annomalie.description = nouvellesDonnees.description;


    // Enregistrez les modifications
    await annomalie.save();

    return res.status(200).json({ message: "Modifié avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite", error: error });
  }
};
