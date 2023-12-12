//create un utilisateur
const categorieSchema = require("../models/categorie.model");
const equipementModel = require("../models/equipement.model")

/* module.exports.createCategorie = async (req, res) => {
    console.log("Créer un categorie");
    const categorie = await categorieSchema.create({
        nom: req.body.nom,
        description: req.body.description,
        code_categorie: req.body.code_categorie,
        image_categorie: req.body.image_categorie,
        code_qr: req.body.code_qr,
        code_bar: req.body.code_bar,
    });
    res.status(200).json(categorie);
} */

module.exports.createCategorie = async (req, res) => {
try {
    if(req.file){
        const image_categorie = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    const categorie = await categorieSchema.create({
        ...req.body,
        image_categorie,
    });
    res.status(200).json(categorie);
    }else{
         const categorie = await categorieSchema.create({
        ...req.body,
    });
    res.status(200).json(categorie);
    }
} catch (error) {
    res.status(400).json(error)
}
};

//Toutes les catégories
module.exports.getcats = async (req, res, next) => {
    try {
        const categories = await categorieSchema.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};



// Toutes les catégories avec leurs nombre d'équipements

module.exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categorieSchema.aggregate([
            {
                $lookup: {
                    from: "equipements",
                    localField: "_id",
                    foreignField: "categorie",
                    as: "equipements"
                }
            },
            {
                $project: {
                    _id: 1,
                    nom: 1,
                    nombre_equipements: { $size: "$equipements" }
                }
            }
        ]);

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

module.exports.modifierCategorie= async (req, res) => {
  const id = req.params.id;
  const nouvellesDonnees = req.body; // Les nouvelles données à mettre à jour

  try {
    // Recherchez le document par ID
    const categorie = await categorieSchema.findById(id);

    if (!categorie) {
      return res.status(404).json({ message: "catégorie non trouvé" });
    }

    // Mettez à jour les champs du document avec les nouvelles données
    categorie.nom = nouvellesDonnees.nom;
    categorie.description = nouvellesDonnees.description;
    // Ajoutez d'autres mises à jour ici...

    // Enregistrez les modifications
    await categorie.save();

    return res.status(200).json({ message: "Modifié avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite", error: error });
  }
};

module.exports.supprimerCategorie = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let cat = await categorieSchema.findById(id);

    if (!cat) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    // Supprimer l'équipement
    await categorieSchema.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de la Catégorie :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la Catégorie" });
  }
};