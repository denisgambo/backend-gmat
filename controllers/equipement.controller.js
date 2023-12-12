const equipementModel = require("../models/equipement.model");
const upload = require("../middleware/multer/equipement");
const mongoose = require("mongoose");
const categorieSchema = require("../models/categorie.model");
const localisationModel = require("../models/localisation.model");

/* module.exports.createEquipement = async (req, res) => {
    const image_equipement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const equipement = await equipementModel.create({
      
        ...req.body,
        
        image_equipement, //: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    res.status(200).json(equipement);
}; */
module.exports.createEquipement = async (req, res) => {
  console.log(req.body)
    try {
      if(req.file){
        const image_equipement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const equipement = await equipementModel.create({
      
        ...req.body,
        
        image_equipement, //: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    res.status(200).json(equipement);
      }else{
        const equipement = await equipementModel.create({
      
        ...req.body,
        
    });
    res.status(200).json(equipement);
      }
    } catch (error) {
      res.status(400).json(error)
    }
};

/* module.exports.createEquipement = async (req, res) => {
  try {
    const { nom, description, reference, categorie, localite, disponibilite, code_inventaire, marque, observation, date_acquisition, date_mise_en_service, code_qr } = req.body;
    const image_equipement = req.file.filename; // Utiliser req.file.filename pour obtenir le nom du fichier de l'image

    const equipement = await equipementModel.create({
      nom,
      description,
      reference,
      categorie,
      localite,
      disponibilite,
      code_inventaire,
      marque,
      observation,
      date_acquisition,
      date_mise_en_service,
      code_qr,
      image_equipement // Enregistrer le nom du fichier de l'image
    });

    res.status(201).json(equipement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'équipement' });
  }
}; */




module.exports.getAllEquipements = async (req, res, next) => {
    try {
        const equipements = await equipementModel.find();
        res.status(200).json(equipements);
    } catch (error) {
        next(error);
    }
};

module.exports.getAllEquipementsWithCategorieName = async (req, res, next) => {
  try {
    const aggregationResult = await equipementModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categorie",
          foreignField: "_id",
          as: "categorie"
        }
      },
      {
        $lookup: {
          from: "fournisseurs",
          localField: "fournisseur",
          foreignField: "_id",
          as: "fournisseur"
        }
      },
      {
        $lookup: {
          from: "localisations",
          localField: "localite",
          foreignField: "_id",
          as: "localite"
        }
      },
      {
        $project: {
          nom: 1,
          service: 1,
          reference: 1,
          description: 1,
          categorie: { $arrayElemAt: ["$categorie.nom", 0] },
          fournisseur: { $arrayElemAt: ["$fournisseur.nom", 0] },
          code_inventaire: 1,
          image_equipement: 1,
          marque: 1,
           au_rebut: 1,
          observation: 1,
          localite: { $arrayElemAt: ["$localite.nom", 0] },
          date_acquisition: 1,
          date_mise_en_service: 1,
          disponibilite: 1,
          code_qr: 1,
          code_bar: 1
        }
      },
      {
        $match: {
          au_rebut: false // Filtrer les équipements avec au_rebut à true
        }
      }
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

//Les équipements au rebut
module.exports.getEquipementAuRebut = async (req, res, next) => {
  try {
    const aggregationResult = await equipementModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categorie",
          foreignField: "_id",
          as: "categorie"
        }
      },
      {
        $lookup: {
          from: "fournisseurs",
          localField: "fournisseur",
          foreignField: "_id",
          as: "fournisseur"
        }
      },
      {
        $lookup: {
          from: "localisations",
          localField: "localite",
          foreignField: "_id",
          as: "localite"
        }
      },
      {
        $project: {
          nom: 1,
          service: 1,
          reference: 1,
          description: 1,
          categorie: { $arrayElemAt: ["$categorie.nom", 0] },
          fournisseur: { $arrayElemAt: ["$fournisseur.nom", 0] },
          code_inventaire: 1,
          image_equipement: 1,
          marque: 1,
           au_rebut: 1,
          observation: 1,
          localite: { $arrayElemAt: ["$localite.nom", 0] },
          date_acquisition: 1,
          date_mise_en_service: 1,
          disponibilite: 1,
          code_qr: 1,
          code_bar: 1
        }
      },

{
        $match: {
          au_rebut: true // Filtrer les équipements avec au_rebut à true
        }
      }
    ]);

    res.status(200).json(aggregationResult);
  } catch (error) {
    next(error);
  }
};

/* module.exports.getEquipementsByCategorie = async (req, res, next) => {
    try {
        const { categorieId } = req.query;
        const equipements = await equipementModel.aggregate([
            {
                $match: {
                    categorie: categorieId
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categorie",
                    foreignField: "_id",
                    as: "categorie"
                }
            },
            {
                $unwind: "$categorie"
            },
            {
                $lookup: {
                    from: "localisations",
                    localField: "localite",
                    foreignField: "_id",
                    as: "localite"
                }
            },
            {
                $unwind: "$localite"
            },
            {
                $project: {
                    _id: 1,
                    nom: 1,
                    reference: 1,
                    description: 1,
                    categorie: "$categorie.nom",
                    code_inventaire: 1,
                    image_equipement: 1,
                    marque: 1,
                    observation: 1,
                    localite: "$localite.nom",
                    date_acquisition: 1,
                    date_mise_en_service: 1,
                    disponibilite: 1,
                    code_qr: 1,
                    code_bar: 1
                }
            }
        ]);

        res.status(200).json(equipements);
    } catch (error) {
        next(error);
    }
}; */

module.exports.getEquipementsByCategorie2 = async (req, res, next) => {
    try {
        const { categorieId } = req.query;
        const equipements = await equipementModel.aggregate([
            {
                $match: {
                    categorie: new mongoose.Types.ObjectId(categorieId)
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categorie",
                    foreignField: "_id",
                    as: "categorie"
                }
            },
            {
                $unwind: "$categorie"
            },
            {
                $lookup: {
                    from: "localisations",
                    localField: "localite",
                    foreignField: "_id",
                    as: "localite"
                }
            },
            {
                $unwind: "$localite"
            },
            {
                $project: {
                    _id: 1,
                    nom: 1,
                    service: 1,
                    reference: 1,
                    description: 1,
                    "categorie.nom": 1,
                    code_inventaire: 1,
                    image_equipement: 1,
                    marque: 1,
                    au_rebut: 1,
                    observation: 1,
                    "localite.nom": 1,
                    date_acquisition: 1,
                    date_mise_en_service: 1,
                    disponibilite: 1,
                    code_qr: 1,
                    code_bar: 1
                }
            }
        ]);

        res.status(200).json(equipements);
    } catch (error) {
        next(error);
    }
};

//Le nombre d'&quipements par catégorie


module.exports.calculerNombreEquipementsParCategorie = async (req, res) => {
  try {
    const categories = await categorieSchema.find();
    const result = [];

    for (const categorie of categories) {
      const count = await equipementModel.countDocuments({ categorie: categorie._id });
      result.push({ categorie: categorie.nom, nombreEquipements: count });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du calcul du nombre d'équipements par catégorie." });
  }
};

//disponibilités par catégorie et par localité
module.exports.calculerNombreEquipementsParCategorieEtLocalite = async (req, res) => {
  try {
    const categories = await categorieSchema.find();
    const localites = await localisationModel.find();
    const result = [];

    for (const categorie of categories) {
      const equipements = await equipementModel.find({ categorie: categorie._id, disponibilite: true });
      const localiteCounts = [];

      for (const localite of localites) {
        const count = equipements.filter(equipement => equipement.localite.toString() === localite._id.toString()).length;
        localiteCounts.push({ localite: localite.nom, count });
      }

      result.push({ categorie: categorie.nom, localiteCounts });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du calcul du nombre d'équipements par catégorie et par localité." });
  }
};

// Indisponibilité par catégorie et par localité
module.exports.calculerNombreEquipementsParCategorieEtLocaliteIndispo = async (req, res) => {
  try {
    const categories = await categorieSchema.find();
    const localites = await localisationModel.find();
    const result = [];

    for (const categorie of categories) {
      const equipements = await equipementModel.find({ categorie: categorie._id, disponibilite: false });
      const localiteCounts = [];

      for (const localite of localites) {
        const count = equipements.filter(equipement => equipement.localite.toString() === localite._id.toString()).length;
        localiteCounts.push({ localite: localite.nom, count });
      }

      result.push({ categorie: categorie.nom, localiteCounts });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du calcul du nombre d'équipements par catégorie et par localité." });
  }
};
/* module.exports.calculerNombreEquipementsParCategorieEtLocalite = async (req, res) => {
  try {
    const categories = await categorieSchema.find();
    const result = [];

    for (const categorie of categories) {
      const equipements = await equipementModel.find({ categorie: categorie._id, disponibilite: true });
      const countByLocalite = {};

      for (const equipement of equipements) {
        const localite = equipement.localite.toString();
        if (countByLocalite[localite]) {
          countByLocalite[localite]++;
        } else {
          countByLocalite[localite] = 1;
        }
      }

      const localiteCounts = Object.entries(countByLocalite).map(([localite, count]) => ({ localite, count }));
      result.push({ categorie: categorie.nom, localiteCounts });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du calcul du nombre d'équipements par catégorie et par localité." });
  }
}; */


/* module.exports.calculerNombreEquipementsParCategorieEtLocalite = async (req, res) => {
  try {
    const categories = await categorieSchema.find();
    const result = [];

    for (const categorie of categories) {
      const count = await equipementModel.countDocuments({ categorie: categorie._id, disponibilite: true });
      result.push({ categorie: categorie.nom, nombreEquipements: count });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du calcul du nombre d'équipements par catégorie et par localité." });
  }
}; */



/* module.exports.calculerNombreEquipementsParCategorieEtLocalite = async (req, res) => {
  try {
    const categories = await categorieSchema.find();
    const result = [];

    for (const categorie of categories) {
      const equipements = await equipementModel.find({ categorie: categorie._id, disponibilite: true }).populate("localite");
      const localitesCountMap = {};

      for (const equipement of equipements) {
        const localite = equipement.localite;
        if (localitesCountMap[localite]) {
          localitesCountMap[localite]++;
        } else {
          localitesCountMap[localite] = 1;
        }
      }

      const categorieResult = { categorie: categorie.nom, localites: [] };

      for (const localite in localitesCountMap) {
        categorieResult.localites.push({ localite: localite.nom, nombreEquipements: localitesCountMap[localite] });
      }

      result.push(categorieResult);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du calcul du nombre d'équipements par catégorie et par localité." });
  }
}; */

//Changer la disponibilité de l'équipement

module.exports.updateEquipementDisponibilite = async (req, res) => {
  const id = req.body.id; // ID du consommable à mettre à jour
  const disponibilite = req.body.disponibilite; 
  try {
    // Recherche du consommable par son ID
    let equipement = await equipementModel.findById(id);

    if (!equipement) {
      return res.status(404).json({ message: "equipement non trouvé" });
    }

    // Mise à jour de la quantité en stock
    if(disponibilite==true){
        equipement.disponibilite =false;
    }else if(disponibilite == false){
        equipement.disponibilite = true;
    }

    // Enregistrement des modifications
    await equipement.save();

    res.status(200).json(equipement);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la mise à jour de l'équipement :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'équipment" });
  }
};
//Supprimer un équipement
module.exports.supprimerEquipement = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let equipement = await equipementModel.findById(id);

    if (!equipement) {
      return res.status(404).json({ message: "Équipement non trouvé" });
    }

    // Supprimer l'équipement
    await equipementModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "Équipement supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de l'équipement :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'équipement" });
  }
};


//selectionner un équipement par id
module.exports.getEquipementById = async (req, res) => {
  const id = req.params.id;

  try {
    let equipement = await equipementModel.findById(id);

    if (equipement) {
      res.status(200).json({ equipement });
    } else {
      res.status(404).json({ message: "Équipement non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'équipement." });
  }
};

//Modifier un équipement

module.exports.updateEquipement = async (req, res) => {
  const id = req.params.id;
 



  try {
    // Vérifier si une nouvelle image a été fournie
    if (req.file) {
      const image_equipement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

      // Mettre à jour l'équipement avec la nouvelle image
      await equipementModel.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)  },
        { ...req.body, image_equipement },
        { new: true }
      );
      console.log(" premier succès")
    } else {
      // Mettre à jour l'équipement sans changer l'image
      await equipementModel.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      console.log(" deuxième succès")
    }

    res.status(200).json({ message: "L'équipement a été mis à jour avec succès." });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};







