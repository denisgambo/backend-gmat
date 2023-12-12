//create un utilisateur
const demandeAchatSchema = require("../models/demande_achat.model");
const moment = require('moment');
const ligneDemandeAchatSchema = require("../models/ligneDemandeAchat.model")
const consommableModel = require("../models/consommable.model");




module.exports.createDemandeAchat = async (req, res) => {
  // console.log(req.body)

    const demande_achat = await demandeAchatSchema.create({
        ...req.body,
    });
    res.status(200).json(demande_achat);
};

module.exports.createLigneDemandeAchat = async (req, res) => {
  console.log(req.body)

    const ligne_demande_achat = await ligneDemandeAchatSchema.create({
        ...req.body,
    });
    res.status(200).json(ligne_demande_achat);
};

/* // Contrôleur pour récupérer le dernier enregistrement
module.exports.getLastApprovisionnement = async (req, res) => {
  try {
    const approvisionnement = await approvisionnementModel.findOne()
      .sort({ createdAt: -1 }) // Tri décroissant pour obtenir le dernier enregistrement
    if (!approvisionnement) {
      return res.status(404).json({ message: "Aucun enregistrement trouvé" });
    }
    res.json(approvisionnement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
} */




/* module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    const demande_achats = await demandeAchatSchema.aggregate([
      {
        $lookup: {
          from: "ligneDemandeAchats",
          localField: "_id",
          foreignField: "demande_achat",
          as: "lignesDemandeAchat"
        }
      },
      {
        $lookup: {
          from: "consommables",
          localField: "lignesDemandeAchat.consommable",
          foreignField: "_id",
          as: "consommables"
        }
      },
  
      {
        $project: {
          _id: 1,
          description: 1,
          date_emission: 1,
          validation_status:1,
          date_validation: 1,
          emetteur:1,
          validateur:1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          lignesDemandeAchat: {
            _id: 1,
            description: 1,
            demande_achat: 1,
            quantite: 1,
           
            consommable: { $arrayElemAt: ["$consommables.nom", 0] },
           
          }
        }
      }
    ]);

    res.status(200).json(demande_achats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

 */
/* 
module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    const demande_achats = await demandeAchatSchema.aggregate([
      {
        $lookup: {
          from: "ligneDemandeAchats",
          localField: "_id",
          foreignField: "demande_achat",
          as: "lignesDemandeAchat"
        }
      },
      {
        $unwind: "$lignesDemandeAchat" // Dérouler le tableau de lignesDemandeAchat
      },
      {
        $lookup: {
          from: "consommables",
          localField: "lignesDemandeAchat.consommable",
          foreignField: "_id",
          as: "consommable"
        }
      },
      {
        $project: {
          _id: 1,
          description: 1,
          date_emission: 1,
          validation_status: 1,
          date_validation: 1,
          emetteur: 1,
          validateur: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          lignesDemandeAchat: {
            _id: 1,
            description: 1,
            demande_achat: 1,
            quantite: 1,
            consommable: { $arrayElemAt: ["$consommable.nom", 0] }
          }
        }
      }
    ]);

    res.status(200).json(demande_achats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

/* module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    const demande_achats = await demandeAchatSchema.find();

    res.status(200).json(demande_achats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

/* module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    const demande_achats = await demandeAchatSchema.find();

    // Parcourir chaque demande d'achat et récupérer les lignes d'achat associées
    for (const demande of demande_achats) {
      demande.lignesDemandeAchat = await ligneDemandeAchatSchema.find({ demande_achat: demande._id });
    }

    res.status(200).json(demande_achats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

/* module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    const demande_achats = await demandeAchatSchema.aggregate([
      {
        $lookup: {
          from: "ligneDemandeAchats",
          localField: "_id",
          foreignField: "demande_achat",
          as: "lignesDemandeAchat"
        }
      },
      {
        $project: {
          _id: 1,
          description: 1,
          date_emission: 1,
          validation_status: 1,
          date_validation: 1,
          emetteur: 1,
          validateur: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          lignesDemandeAchat: 1
        }
      }
    ]);

    res.status(200).json(demande_achats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

// Définir la fonction getAllDemandesAchat
/* module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    // Faire une requête qui joint les collections demandeAchat et ligneDemandeAchat
    const demande_achats = await demandeAchatSchema.aggregate([
      {
        $lookup: {
          from: "lignedemandeachats",
          localField: "_id",
          foreignField: "demande_achat",
          as: "lignesDemandeAchat"
        }
      },
      {
        $project: {
          _id: 1,
          description: 1,
          date_emission: 1,
          validation_status: 1,
          date_validation: 1,
          emetteur: 1,
          validateur: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          lignesDemandeAchat: 1
        }
      }
    ]);
    

    // Envoyer le résultat au format JSON avec un code de statut 200
    res.status(200).json(demande_achats);
  } catch (error) {
    // En cas d'erreur, envoyer un message d'erreur avec un code de statut 400
    res.status(400).json({ error: error.message });
  }
}; */

module.exports.getAllDemandesAchat = async (req, res) => {
  try {
    // Faire une requête qui joint les collections demandeAchat, ligneDemandeAchat et consommable
    const demande_achats = await demandeAchatSchema.aggregate([
      {
        $lookup: {
          from: "lignedemandeachats",
          localField: "_id",
          foreignField: "demande_achat",
          as: "lignesDemandeAchat"
        }
      },
      // Ajouter une opération $lookup pour joindre la collection consommable
      {
        $lookup: {
          from: "consommables",
          localField: "lignesDemandeAchat.consommable",
          foreignField: "_id",
          as: "consommables"
        }
      },
      {
        $project: {
          _id: 1,
          description: 1,
          date_emission: 1,
          validation_status: 1,
          date_validation: 1,
          emetteur: 1,
          validateur: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          lignesDemandeAchat: 1,
          consommables: 1 // Ajouter le champ consommables au résultat
        }
      }
    ]);

    // Envoyer le résultat au format JSON avec un code de statut 200
    res.status(200).json(demande_achats);
  } catch (error) {
    // En cas d'erreur, envoyer un message d'erreur avec un code de statut 400
    res.status(400).json({ error: error.message });
  }
};


// Définir la fonction getAllLignesAchat
/* module.exports.getAllLignesAchat = async (req, res, next) => {
  try {
    // Récupérer tous les enregistrements de la collection ligneDemandeAchat
    const lignes = await ligneDemandeAchatSchema.find();
    console.log(lignes)
    // Envoyer le résultat au format JSON avec un code de statut 200
    res.status(200).json(lignes);
  } catch (error) {
    console.log(error)
    // En cas d'erreur, passer l'erreur au middleware suivant
    next(error);
  }
}; */



module.exports.ValiderInvalier = async (req, res) => {
  const id = req.body.id; // ID du consommable à mettre à jour
  const status = req.body.validation_status; 
  try {
    // Recherche du consommable par son ID
    let demande = await demandeAchatSchema.findById(id);

    if (!demande) {
      return res.status(404).json({ message: "demande non trouvé" });
    }

    // Mise à jour du statut de la demande

    demande.validation_status = status

    // Enregistrement des modifications
    await demande.save();

    res.status(200).json(demande);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ message: "Une erreur s'est produite " });
  }
};


module.exports.TraiterDemande = async (req, res) => {
  const id = req.body.id; // ID du consommable à mettre à jour
  const status = req.body.validation_status; 
  try {
    // Recherche du consommable par son ID
    let demande = await demandeAchatSchema.findById(id);

    if (!demande) {
      return res.status(404).json({ message: "demande non trouvé" });
    }

    // Mise à jour du statut de la demande

    demande.validation_status = status

    // Enregistrement des modifications
    await demande.save();

    res.status(200).json(demande);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ message: "Une erreur s'est produite " });
  }
};








