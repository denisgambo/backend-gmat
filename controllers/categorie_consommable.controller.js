//create un utilisateur
const categorieConsommableSchema = require("../models/categorie_consommable.model")


module.exports.createCategorieConsommable = async (req, res) => {
    try {
        if(req.file){
            const image_categorie = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const categorie_consommable = await categorieConsommableSchema.create({
        ...req.body,
        image_categorie,
    });
    res.status(200).json(categorie_consommable);
        }else{
            const categorie_consommable = await categorieConsommableSchema.create({
        ...req.body,
    });
    res.status(200).json(categorie_consommable);
        }
    } catch (error) {
       res.status(400).json(error)
    }
};


module.exports.getAllCategoriesConsommables = async (req, res, next) => {
    try {
        const categories_consommables = await categorieConsommableSchema.find();
        res.status(200).json(categories_consommables);
    } catch (error) {
        next(error);
    }
};


//Toutes les catégories
module.exports.getcats = async (req, res, next) => {
    try {
        const categories = await categorieConsommableSchema.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

module.exports.modifierCategorieConsommable = async (req, res) => {
  const id = req.params.id;
  const nouvellesDonnees = req.body; // Les nouvelles données à mettre à jour

  try {
    // Recherchez le document par ID
    const categorie_consommable = await categorieConsommableSchema.findById(id);

    if (!categorie_consommable) {
      return res.status(404).json({ message: "catégorie non trouvé" });
    }

    // Mettez à jour les champs du document avec les nouvelles données
    categorie_consommable.nom = nouvellesDonnees.nom;
    categorie_consommable.description = nouvellesDonnees.description;
    // Ajoutez d'autres mises à jour ici...

    // Enregistrez les modifications
    await categorie_consommable.save();

    return res.status(200).json({ message: "Modifié avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite", error: error });
  }
};

module.exports.getAllCategories = async (req, res, next) => {
    try {
        const categories_consommables = await categorieConsommableSchema.aggregate([
            {
                $lookup: {
                    from: "consommables",
                    localField: "_id",
                    foreignField: "categorie",
                    as: "consommables"
                }
            },
            {
                $project: {
                    _id: 1,
                    nom: 1,
                    description:1,
                    nombre_consommables: { $size: "$consommables" }
                }
            }
        ]);

        res.status(200).json(categories_consommables);
    } catch (error) {
        next(error);
    }
};

module.exports.supprimerCategorie = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let cat = await categorieConsommableSchema.findById(id);

    if (!cat) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    // Supprimer l'équipement
    await categorieConsommableSchema.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de la Catégorie :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la Catégorie" });
  }
};