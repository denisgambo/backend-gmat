//create une opération de maintenance
const operationMaintenanceSchema = require("../models/operationmaintenance.model");
const equipementSchema = require("../models/equipement.model");
const mongoose = require("mongoose");

const moment = require("moment");

/* module.exports.createOperationMaintenance = async (req, res) => {
    const date_e = moment(req.body.date_entree, "DD/MM/YYYY").toDate();
    const date_s = moment(req.body.date_sortie, "DD/MM/YYYY").toDate();
    console.log("Créer un approvisionnement");
    const operationmaintenance = await operationMaintenanceSchema.create({
        equipement: req.body.equipement,
        date_entree: date_e,
        date_sortie: date_s,
        horametre: req.body.horametre,
        anomalie: req.body.anomalie,
        consommation: req.body.consommation,
        operateur_maintenance: req.body.operateur_maintenance
    });
    res.status(200).json(operationmaintenance);
} */

module.exports.createOperationMaintenance = async (req, res) => {
  console.log(req.body);
  try {
    const operationmaintenance = await operationMaintenanceSchema.create({
      ...req.body,
    });
    res.status(200).json(operationmaintenance);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllOperationsMaintenance = async (req, res, next) => {
  try {
    const operationsMaintenance = await operationMaintenanceSchema.find();
    res.status(200).json(operationsMaintenance);
  } catch (error) {
    next(error);
  }
};

module.exports.aggregateOperationsMaintenance = async (req, res, next) => {
  try {
    const aggregationResult = await operationMaintenanceSchema.aggregate([
      {
        $lookup: {
          from: "equipements",
          localField: "equipement",
          foreignField: "_id",
          as: "equipement",
        },
      },
      {
        $unwind: "$equipement",
      },
      {
        $project: {
          _id: 1,
          equipement: "$equipement.nom",
          horametre: 1,
          anomalie: 1,
          motif: 1,
          consommation: 1,
          date_entree: 1,
          date_sortie: 1,
          operateur_maintenance: 1,
          actions_realisees: 1,
        },
      },
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

module.exports.aggregateOperationsMaintenance100 = async (req, res, next) => {
  try {
    const aggregationResult = await operationMaintenanceSchema.aggregate([
      {
        $lookup: {
          from: "equipements",
          localField: "equipement",
          foreignField: "_id",
          as: "equipement",
        },
      },
      {
        $unwind: "$equipement",
      },
      {
        $lookup: {
          from: "consommables",
          localField: "consommation",
          foreignField: "_id",
          as: "consommation",
        },
      },
      {
        $project: {
          _id: 1,
          equipement: "$equipement.nom",
          horametre: 1,
          anomalie: 1,
          motif: 1,
          consommation: "$consommation.nom",
          date_entree: 1,
          date_sortie: 1,
          operateur_maintenance: 1,
          actions_realisees: 1,
        },
      },
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

/* module.exports.aggregateOperationsMaintenance2 = async (req, res, next) => {
    try {
        const aggregationResult = await operationMaintenanceSchema.aggregate([
            {
                $lookup: {
                    from: "equipements",
                    localField: "equipement",
                    foreignField: "_id",
                    as: "equipement"
                }
            },
            {
                $unwind: "$equipement"
            },
            {
                $lookup: {
                    from: "consommations",
                    localField: "consommation",
                    foreignField: "_id",
                    as: "consommation"
                }
            },
            {
                $unwind: "$consommation"
            },
            {
                $lookup: {
                    from: "consommables",
                    localField: "consommation.consommable",
                    foreignField: "_id",
                    as: "consommation.consommable"
                }
            },
            {
                $unwind: "$consommation.consommable"
            },
            {
                $group: {
                    _id: "$_id",
                    equipement: { $first: "$equipement.nom" },
                    horametre: { $first: "$horametre" },
                    anomalie: { $first: "$anomalie" },
                    utilisateur: { $first: "$utilisateur" },
                    consommables: {
                        $push: {
                            nom: "$consommation.consommable.nom",
                            quantite: "$consommation.quantite"
                        }
                    },
                    date_entree: { $first: "$date_entree" },
                    date_sortie: { $first: "$date_sortie" },
                    operateur_maintenance: { $first: "$operateur_maintenance" }
                }
            }
        ]);

        res.status(200).json(aggregationResult);
    } catch (error) {
        next(error);
    }
};
 */

module.exports.aggregateOperationsMaintenance2 = async (req, res, next) => {
  try {
    const aggregationResult = await operationMaintenanceSchema.aggregate([
      {
        $lookup: {
          from: "equipements",
          localField: "equipement",
          foreignField: "_id",
          as: "equipement",
        },
      },
      {
        $unwind: "$equipement",
      },
      {
        $lookup: {
          from: "consommations",
          localField: "consommation",
          foreignField: "_id",
          as: "consommation",
        },
      },
      {
        $unwind: {
          path: "$consommation",
          preserveNullAndEmptyArrays: true, // Conserver les opérations de maintenance sans consommations
        },
      },
      {
        $lookup: {
          from: "consommables",
          localField: "consommation.consommable",
          foreignField: "_id",
          as: "consommation.consommable",
        },
      },
      {
        $unwind: {
          path: "$consommation.consommable",
          preserveNullAndEmptyArrays: true, // Conserver les consommations sans consommables
        },
      },
      {
        $group: {
          _id: "$_id",
          equipement: { $first: "$equipement.nom" },
          horametre: { $first: "$horametre" },
          anomalie: { $first: "$anomalie" },
          actions_realisees: { $first: "$actions_realisees" },
          motif: { $first: "$motif" },
          utilisateur: { $first: "$utilisateur" },
          autres_depenses: { $first: "$autres_depenses" },

          consommables: {
            $push: {
              nom: "$consommation.consommable.nom",
              quantite: "$consommation.quantite",
            },
          },
          date_entree: { $first: "$date_entree" },
          date_sortie: { $first: "$date_sortie" },
          operateur_maintenance: { $first: "$operateur_maintenance" },
        },
      },
      {
        $sort: { date_entree: -1 },
      },
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

module.exports.aggregateOperationsMaintenance200 = async (req, res, next) => {
  try {
    const aggregationResult = await operationMaintenanceSchema.aggregate([
      {
        $lookup: {
          from: "equipements",
          localField: "equipement",
          foreignField: "_id",
          as: "equipement",
        },
      },
      {
        $unwind: "$equipement",
      },
      {
        $lookup: {
          from: "consommations",
          localField: "consommation",
          foreignField: "_id",
          as: "consommation",
        },
      },
      {
        $unwind: "$consommation",
      },
      {
        $lookup: {
          from: "consommables",
          localField: "consommation.consommable",
          foreignField: "_id",
          as: "consommation.consommable",
        },
      },
      {
        $unwind: "$consommation.consommable",
      },
      {
        $project: {
          _id: 1,
          equipement: "$equipement.nom",
          horametre: 1,
          anomalie: 1,
          "consommation.consommable": "$consommation.consommable.nom",
          "consommation.quantite": 1,
          date_entree: 1,
          date_sortie: 1,
          operateur_maintenance: 1,
          actions_realisees: 1,
        },
      },
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

/* module.exports.aggregateOperationsMaintenanceByEquipement = async (req, res, next) => {
    try {
        const { equipementId } = req.params;

        const aggregationResult = await operationMaintenanceSchema.aggregate([
            {
                $match: {
                    equipement: new mongoose.Types.ObjectId(equipementId)
                }
            },
            {
                $lookup: {
                    from: "equipements",
                    localField: "equipement",
                    foreignField: "_id",
                    as: "equipement"
                }
            },
            {
                $unwind: "$equipement"
            },
            {
                $lookup: {
                    from: "consommables",
                    localField: "consommation",
                    foreignField: "_id",
                    as: "consommation"
                }
            },
            {
                $project: {
                    _id: 1,
                    equipement: "$equipement.nom",
                    horametre: 1,
                    anomalie: 1,
                    consommation: "$consommation.nom",
                    date_entree: 1,
                    date_sortie: 1,
                    operateur_maintenance: 1
                }
            }
        ]);

        res.status(200).json(aggregationResult);
    } catch (error) {
        next(error);
    }
}; */

//récent
module.exports.aggregateOperationsMaintenanceByEquipement = async (
  req,
  res,
  next
) => {
  try {
    const { equipementId } = req.params;

    const aggregationResult = await operationMaintenanceSchema.aggregate([
      {
        $match: {
          equipement: new mongoose.Types.ObjectId(equipementId),
        },
      },
      {
        $lookup: {
          from: "equipements",
          localField: "equipement",
          foreignField: "_id",
          as: "equipement",
        },
      },
      {
        $unwind: "$equipement",
      },
      {
        $lookup: {
          from: "consommations",
          localField: "consommation",
          foreignField: "_id",
          as: "consommation",
        },
      },
      {
        $unwind: "$consommation",
      },

      {
        $lookup: {
          from: "consommables",
          localField: "consommation.consommable",
          foreignField: "_id",
          as: "consommation.consommable",
        },
      },
      {
        $unwind: "$consommation.consommable",
      },
      {
        $project: {
          _id: 1,
          equipement: "$equipement.nom",
          horametre: 1,
          anomalie: 1,
          motif: 1,
          "consommation.consommable": "$consommation.consommable.nom",
          "consommation.quantite": 1,
          date_entree: 1,
          date_sortie: 1,
          operateur_maintenance: 1,
          actions_realisees: 1,
        },
      },
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour récupérer le dernier enregistrement
module.exports.getLastMaintenance = async (req, res) => {
  try {
    const lastMaintenance = await operationMaintenanceSchema
      .findOne()
      .sort({ createdAt: -1 }); // Tri décroissant pour obtenir le dernier enregistrement
    if (!lastMaintenance) {
      return res.status(404).json({ message: "Aucun enregistrement trouvé" });
    }
    res.json(lastMaintenance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
};

// Contrôleur pour mettre à jour une opération de maintenance en ajoutant un ID de consommation
module.exports.updateMaintenance = async (req, res) => {
  const { operationId, consommationId } = req.body;

  try {
    // Vérifier si l'opération de maintenance existe
    const maintenance = await operationMaintenanceSchema.findById(operationId);
    if (!maintenance) {
      return res
        .status(404)
        .json({ message: "Opération de maintenance non trouvée" });
    }

    // Mettre à jour la liste des ID de consommation
    maintenance.consommation.push(consommationId);

    // Sauvegarder les modifications
    const updatedMaintenance = await maintenance.save();

    res.json(updatedMaintenance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
};

// Ajouter une depense à une maintenance
module.exports.addDepense = async (req, res, next) => {
  try {
    const maintenanceId = req.params.id; // Récupérer l'id de la maintenance
    const depense = req.body; // Récupérer la dépense à ajouter

    const maintenance = await operationMaintenanceSchema.findById(
      maintenanceId
    ); // Trouver la maintenance par son id
    if (maintenance) {
      maintenance.autres_depenses.push(depense); // Ajouter la dépense au tableau
      await maintenance.save(); // Sauvegarder les modifications
      res.status(200).json({ message: "Dépense ajoutée avec succès" });
      console.log("succès: ", depense);
    } else {
      res.status(404).json({ message: "Maintenance introuvable" });
    }
  } catch (error) {
    next(error);
  }
};
