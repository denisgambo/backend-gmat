const justificationModel = require("../models/justification.model");
// const anomalieSchema = require("../models/an.model");


//Créer une justification

module.exports.createJustification = async (req, res) => {
 try {
       const justification = await justificationModel.create({
        ...req.body,
    });
    res.status(200).json(justification);
 } catch (error) {
    console.log(error)
 }
};

//toutes les justifications
module.exports.getJustifications= async (req, res, next) => {
    try {
        const justifications = await justificationModel.find();
        res.status(200).json(justifications);
    } catch (error) {
        next(error);
    }
};

//Supprimer une justification
module.exports.supprimerJustification = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID
  console.log(id)

  try {
    // Recherche de la Justification par son ID
    let justification = await justificationModel.findById(id);

    if (!justification) {
      return res.status(404).json({ message: "Justification non trouvée" });
    }

    // Supprimer la Justification
    await justificationModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "Justification supprimée avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de la Justification :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la Justification " });
  }
};



//selectionner une Justification par id
module.exports.getJustificationById = async (req, res) => {
  const id = req.params.id;

  try {
    let justification = await justificationModel.findById(id);

    if (justification) {
      res.status(200).json({ justification });
    } else {
      res.status(404).json({ message: "Justification non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la Justification." });
  }
};

/* module.exports.modifierJustification = async (req, res)=>{
  const id = req.params.id
  try {
    justificationModel.findOneAndUpdate({_id:id},req.body, {new:true})
    res.status(200).json({message:"Modifié avec succès"})
  } catch (error) {
    res.status(500).json({message:"Une erreur s'est produit"})
  }
} */

module.exports.modifierJustification = async (req, res) => {
  const id = req.params.id;
  const nouvellesDonnees = req.body; // Les nouvelles données à mettre à jour
  console.log("Body: ", nouvellesDonnees)
   console.log("id: ", id)

  try {
    // Recherchez le document par ID
    const justification = await justificationModel.findById(id);

    if (!justification) {
      return res.status(404).json({ message: "Justification non trouvée" });
    }

    // Mettez à jour les champs du document avec les nouvelles données
    justification.titre = nouvellesDonnees.titre;
        justification.description = nouvellesDonnees.description;

    // Ajoutez d'autres mises à jour ici...

    // Enregistrez les modifications
    await justification.save();

    return res.status(200).json({ message: "Modifié avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite", error: error });
  }
};
