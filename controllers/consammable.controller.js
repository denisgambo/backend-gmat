const consommableModel = require("../models/consommable.model");
const mongoose = require("mongoose");

//create un utilisateur
/* module.exports.createConsommable = async (req, res) => {
    const consommable = await consommableModel.create({
        nom: req.body.nom,
        prix_achat: req.body.prix_achat,
        description: req.body.description,
        categorie: req.body.categorie,
        image: req.body.image,
        observation: req.body.observation,
        code_qr: req.body.code_qr,
        code_bar: req.body.code_bar,
        quantite_en_stock: req.body.quantite_en_stock
    });
    res.status(200).json(consommable);
} */

/* module.exports.createConsommable = async (req, res) => {
    const image_consommable = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const consommable = await consommableModel.create({
        ...req.body,
        image_consommable,
    });
    res.status(200).json(consommable);
}; */
module.exports.createConsommable = async (req, res) => {
    try {
      if(req.file){
        const image_consommable = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const consommable = await consommableModel.create({
        ...req.body,
        image_consommable,
    });
    res.status(200).json(consommable);
      }else{
        const consommable = await consommableModel.create({
        ...req.body,
    });
    res.status(200).json(consommable);
      }
    } catch (error) {
      res.status(400).json(error)
    }
};

module.exports.getAllConsommables = async (req, res, next) => {
    try {
        const consommables = await consommableModel.find();
        res.status(200).json(consommables);
    } catch (error) {
        next(error);
    }
};


//Seuil critique de stock

module.exports.getAllConsommablesCritique = async (req, res, next) => {
    try {
        // Utiliser la méthode find avec une requête de filtre
        const consommablesCritique = await consommableModel.find( { $expr: { $gte: [ "$seuil_critique", "$quantite_en_stock"  ] } } );

        res.status(200).json(consommablesCritique);
    } catch (error) {
        next(error);
    }
};



module.exports.getConsommableByCategorie = async (req, res, next) => {
    try {
        const { categorieId } = req.query;
        const consommables = await consommableModel.find({ categorie: categorieId });

        res.status(200).json(consommables);
    } catch (error) {
        next(error);
    }
};


//Augmenter la quantité en stock

module.exports.updateConsommableQuantite = async (req, res) => {
  const consommableId = req.body.id; // ID du consommable à mettre à jour
  const nombreToAdd = parseInt(req.body.quantite); // Nombre entier à ajouter à la quantité en stock
  const type = req.body.type;

  try {
    // Recherche du consommable par son ID
    const consommable = await consommableModel.findById(consommableId);

    if (!consommable) {
      return res.status(404).json({ message: "Consommable non trouvé" });
    }

    // Mise à jour de la quantité en stock
    if(type==1){
        consommable.quantite_en_stock += nombreToAdd;
    }else{
        consommable.quantite_en_stock -= nombreToAdd;
    }

    // Enregistrement des modifications
    await consommable.save();

    res.status(200).json(consommable);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la mise à jour du consommable :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du consommable" });
  }
};


//Slectionner un consommable par id
module.exports.getConsommableById = async (req, res) => {
  const id = req.params.id; 

  try {
    // Recherche de l'équipement par son ID
    let consommable = await consommableModel.findById(id);

    if (!consommable) {
      return res.status(404).json({ message: "consommable non trouvé" });
    }


    // Renvoyer une réponse de succès
    res.status(200).json({ consommable });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la séléction du consommable" });
  }
};


//Modifier un consommable

module.exports.updateConsommable = async (req, res) => {
  const id = req.params.id;
  console.log("id: ", id)
  console.log(req.body)
    console.log(req.query)
      console.log(req.params)



  try {
    // Vérifier si une nouvelle image a été fournie
    if (req.file) {
      const image_consommable = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

      // Mettre à jour l'équipement avec la nouvelle image
      await consommableModel.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)  },
        { ...req.body, image_consommable },
        { new: true }
      );
      console.log(" premier succès")
    } else {
      // Mettre à jour l'équipement sans changer l'image
      await consommableModel.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      console.log(" deuxième succès")
    }

    res.status(200).json({ message: "Le consommable a été mis à jour avec succès." });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};


//Supprimer un consommable
module.exports.supprimerConsommable = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let consommable = await consommableModel.findById(id);

    if (!consommable) {
      return res.status(404).json({ message: "consommable non trouvé" });
    }

    // Supprimer l'équipement
    await consommableModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "consommable supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du consommable :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du consommable " });
  }
};

