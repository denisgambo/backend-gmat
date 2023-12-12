//create un utilisateur
const approvisionnementModel = require("../models/approvisionnement.model");
const moment = require('moment');
const ligneApprovisionnementSchema = require("../models/ligneapprovisionnement.model")
const consommableModel = require("../models/consommable.model");




module.exports.createApprovisionnement = async (req, res) => {

    const approvisionnement = await approvisionnementModel.create({
        ...req.body,
    });
    res.status(200).json(approvisionnement);
};

// Contrôleur pour récupérer le dernier enregistrement
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
}




/* module.exports.getAllApprovisionnements = async (req, res) => {
  try {
    const approvisionnements = await approvisionnementModel.aggregate([
      {
        $lookup: {
          from: "ligneapprovisionnements",
          localField: "_id",
          foreignField: "approvisionnement",
          as: "lignesApprovisionnement"
        }
      },
      {
        $lookup: {
          from: "consommables",
          localField: "lignesApprovisionnement.consommable",
          foreignField: "_id",
          as: "consommables"
        }
      },
      {
        $lookup: {
          from: "fournisseurs",
          localField: "lignesApprovisionnement.fournisseur",
          foreignField: "_id",
          as: "fournisseurs"
        }
      },
      {
        $project: {
          _id: 1,
          description: 1,
          date_commande: 1,
          date_reception: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          lignesApprovisionnement: {
            _id: 1,
            description: 1,
            approvisionnement: 1,
            quantite: 1,
            prix_unitaire: 1,
            prix_total: 1,
            consommable: { $arrayElemAt: ["$consommables.nom", 0] },
            fournisseur: { $arrayElemAt: ["$fournisseurs.nom", 0] }
          }
        }
      }
    ]);

    res.status(200).json(approvisionnements);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

module.exports.getAllApprovisionnements = async (req, res) => {
  try {
    const approvisionnements = await approvisionnementModel.aggregate([
      {
        $lookup: {
          from: "ligneapprovisionnements",
          localField: "_id",
          foreignField: "approvisionnement",
          as: "lignesApprovisionnement"
        }
      },
      {
        $unwind: "$lignesApprovisionnement"
      },
      {
        $lookup: {
          from: "consommables",
          localField: "lignesApprovisionnement.consommable",
          foreignField: "_id",
          as: "consommable"
        }
      },
      {
        $group: {
          _id: "$_id",
          description: { $first: "$description" },
          date_commande: { $first: "$date_commande" },
          date_reception: { $first: "$date_reception" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          lignesApprovisionnement: {
            $push: {
              _id: "$lignesApprovisionnement._id",
              description: "$lignesApprovisionnement.description",
              approvisionnement: "$lignesApprovisionnement.approvisionnement",
              quantite: "$lignesApprovisionnement.quantite",
              prix_unitaire: "$lignesApprovisionnement.prix_unitaire",
              prix_total: "$lignesApprovisionnement.prix_total",
              consommable: { $arrayElemAt: ["$consommable.nom", 0] },
              fournisseur: "$lignesApprovisionnement.fournisseur"
            }
          }
        }
      }
    ]);

    res.status(200).json(approvisionnements);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






