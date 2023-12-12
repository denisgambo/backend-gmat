//create une consommation
const consommationSchema = require("../models/consommation.model");
const consommableModel = require("../models/consommable.model");
const equipementModel = require("../models/equipement.model");
const mongoose = require("mongoose")


/* module.exports.createConsommation = async (req, res) => {
    console.log("Créer une consommation");
 const consommable = await consommableModel.findById(req.body.consommable,);
  console.log(consommable)

  // Conversion des quantités en nombre
  const quantite = req.body.quantite;
  const quantite_depart = consommable.quantite;
  const quantite_restante = quantite_depart - quantite;
  //creer
    const consommation = await consommationSchema.create({
        equipement: req.body.equipement,
        description: req.body.description,
        date: req.body.date,
        consommable: req.body.consommable,
        quantite: req.body.quantite,
        quantite_depart: quantite_depart,
        quantite_restante: quantite_restante,
    });
    res.status(200).json(consommation);
} */

module.exports.createConsommation = async (req, res) => {
  console.log(req.body)
    try {
      const consommable = await consommableModel.findById(req.body.consommable);
    // Conversion des quantités en nombre
  const quantite = req.body.quantite;
  const quantite_depart = Number(consommable.quantite_en_stock);
  const quantite_restante = quantite_depart - quantite;
    const consommation = await consommationSchema.create({
        ...req.body,
        quantite_depart,
        quantite_restante
    });
    res.status(200).json(consommation);
    } catch (error) {
      res.status(500).json(error)
    }
};

/* module.exports.createConsommation = async (req, res) => {
  console.log("Créer une consommation");
  const consommation = req.body;
  const consommable = await consommableModel.findById(consommation.consommable);
  console.log(consommation)

  // Conversion des quantités en nombre
  const quantite = consommation.quantite;
  const quantite_depart = consommable.quantite;
  const quantite_restante = quantite_depart - quantite;

  const createdConsommation = await consommationSchema.create({
    ...consommation,
    quantite_depart,
    quantite_restante,
  });

  res.status(200).json(createdConsommation);
}; */

//Voir les consommations

module.exports.statisticsConsommation = async (req, res, next) => {
    try {
        const results = await equipementModel.aggregate([
            {
                $lookup: {
                    from: "consommations",
                    localField: "_id",
                    foreignField: "equipement",
                    as: "consommations"
                }
            },
            {
                $lookup: {
                    from: "consommables",
                    localField: "consommations.consommable",
                    foreignField: "_id",
                    as: "consommables"
                }
            },
            {
                $project: {
                    _id: 1,
                    nom: 1,
                    reference: 1,
                    description: 1,
                    categorie: 1,
                    code_inventaire: 1,
                    image_equipement: 1,
                    marque: 1,
                    observation: 1,
                    localite: 1,
                    date_acquisition: 1,
                    date_mise_en_service: 1,
                    disponibilite: 1,
                    code_qr: 1,
                    code_bar: 1,
                    consommations: {
                        _id: 1,
                        description: 1,
                        date: 1,
                        hora: 1,
                        consommable: 1,
                        quantite: 1,
                        utilisateur: 1,
                        consommables: {
                            _id: 1,
                            nom: 1,
                            prix_achat: 1,
                            description: 1,
                            categorie: 1,
                            image: 1,
                            quantite_en_stock: 1,
                            code_qr: 1,
                            code_bar: 1
                        }
                    }
                }
            },
            {
                $unwind: "$consommations"
            },
            {
                $sort: { "consommations.createdAt": -1 } // Tri par date d'enregistrement décroissante (plus récent au plus ancien)
            }
        ]);

        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};



// Contrôleur pour récupérer le dernier enregistrement
module.exports.getLastConsommation = async (req, res) => {
  try {
    const consommation = await consommationSchema.findOne()
      .sort({ createdAt: -1 }) // Tri décroissant pour obtenir le dernier enregistrement
    if (!consommation) {
      return res.status(404).json({ message: "Aucun enregistrement trouvé" });
    }
    res.json(consommation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
}
//La consommation par consommables
/* module.exports.getConsommationByConsommable = async (req, res, next) => {
  try {
    const { consommableId } = req.query;
    console.log(consommableId)
    const consommations = await consommationSchema.find({ consommable: consommableId });

    res.status(200).json(consommations);
  } catch (error) {
    next(error);
  }
}; */
module.exports.getConsommationByConsommable = async (req, res, next) => {
  try {
    const { consommableId } = req.query;

    const consommations = await consommationSchema.aggregate([
      {
        $match: { consommable: new mongoose.Types.ObjectId(consommableId) }
      },
      {
        $lookup: {
          from: 'consommables',
          localField: 'consommable',
          foreignField: '_id',
          as: 'consommableInfo'
        }
      },
      {
        $lookup: {
          from: 'equipements',
          localField: 'equipement',
          foreignField: '_id',
          as: 'equipementInfo'
        }
      },
      {
        $unwind: '$consommableInfo'
      },
      {
        $unwind: '$equipementInfo'
      },
      {
        $project: {
          _id: 1,
          equipement: '$equipementInfo.nom',
          consommable: '$consommableInfo.nom',
          quantite_depart: 1,
          quantite: 1,
          description: 1,
          hora: 1,
          quantite_restante: 1,
          date: 1,
          utilisateur: 1
        }
      },
      {
        $sort: { date: -1 } // Tri par date d'enregistrement décroissante (plus récent au plus ancien)
      }
    ]);

    res.status(200).json(consommations);
  } catch (error) {
    next(error);
  }
};



//Consommation par équipement
module.exports.getConsommationByEquipement = async (req, res, next) => {
  try {
    const { equipementId } = req.query;
    // console.log(consommableId);

    const consommations = await consommationSchema.aggregate([
      {
        $match: { equipement: new mongoose.Types.ObjectId(equipementId) }
      },
      {
        $lookup: {
          from: 'consommables',
          localField: 'consommable',
          foreignField: '_id',
          as: 'consommableInfo'
        }
      },
      {
        $lookup: {
          from: 'equipements',
          localField: 'equipement',
          foreignField: '_id',
          as: 'equipementInfo'
        }
      },
      {
        $unwind: '$consommableInfo'
      },
      {
        $unwind: '$equipementInfo'
      },
      {
        $project: {
          _id: 1,
          equipement: '$equipementInfo.nom',
          consommable: '$consommableInfo.nom',
          quantite_depart: 1,
          quantite: 1,
          hora:1,
          quantite_restante: 1,
          date: 1,
          description:1,
          utilisateur:1
        }
      },
      {
        $sort: { date: -1 } // Tri par date d'enregistrement décroissante (plus récent au plus ancien)
      }
    ]);

    res.status(200).json(consommations);
  } catch (error) {
    next(error);
  }
};




