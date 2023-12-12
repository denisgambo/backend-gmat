//create un utilisateur
const entrepriseSchema = require("../models/entreprise.model");
const mongoose = require("mongoose")


module.exports.CreateEntrprise = async (req, res) => {
    console.log("Créer une entreprise");
    const entreprise = await entrepriseSchema.create({
        nom: req.body.nom,
        email: req.body.email,
        logo: req.body.logo,
        telephone: req.body.telephone,
    });
    res.status(200).json(entreprise);
}

module.exports.getEntreprise = async (req, res, next) => {
    try {
        const entreprise = await entrepriseSchema.findOne();
        res.status(200).json(entreprise);
    } catch (error) {
        next(error);
    }
};


//Modifier l'entreprise 

module.exports.updateEntreprise = async (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  
  try {
    // Vérifier si une nouvelle image a été fournie
    if (req.file) {
      const logo = `${req.protocol}://${req.get('host')}/images/logo/${req.file.filename}`;

      // Mettre à jour l'équipement avec la nouvelle image
      await entrepriseSchema.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)  },
        { ...req.body, logo },
        { new: true }
      );
      console.log(" premier succès")
    } else {
      // Mettre à jour l'équipement sans changer l'image
      await entrepriseSchema.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      console.log(" deuxième succès")
    }

    res.status(200).json({ message: "Mise à jour avec succès." });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};



module.exports.setAccueilBackground = async (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  
  try {
    // Vérifier si une nouvelle image a été fournie
    if (req.file) {
      const background_image_accueil = `${req.protocol}://${req.get('host')}/images/fonds/${req.file.filename}`;

      // Mettre à jour l'équipement avec la nouvelle image
      await entrepriseSchema.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)  },
        { ...req.body, background_image_accueil },
        { new: true }
      );
      console.log(" premier succès")
          res.status(200).json({ message: "Mise à jour avec succès." });

    } else {
            res.status(500).json({ message: "Aucune image selectionnée." });
    }

  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};


module.exports.setDashbordBackground = async (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  
  try {
    // Vérifier si une nouvelle image a été fournie
    if (req.file) {
      const background_image_dashbord = `${req.protocol}://${req.get('host')}/images/fonds/${req.file.filename}`;

      // Mettre à jour l'équipement avec la nouvelle image
      await entrepriseSchema.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)  },
        { ...req.body, background_image_dashbord },
        { new: true }
      );
      console.log(" premier succès")
          res.status(200).json({ message: "Mise à jour avec succès." });

    } else {
            res.status(500).json({ message: "Aucune image selectionnée." });
    }

  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};


