//create un utilisateur
const UserModel = require("../models/utilisateurs.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/utilisateur.route");
const mongoose = require("mongoose");
/* module.exports.createUser = async (req, res) => {
    console.log("Créer un user");
    const user = await UserModel.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        login: req.body.login,
        telephone: req.body.telephone,
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe,
        role: req.body.role,
        photo_profil: "../assets/images/photo_profil.png",
        genre: req.body.genre
    });
    res.status(200).json(user);
} */

module.exports.createUser = async (req, res) => {
  console.log("Créer un user");
  const saltRounds = 10; // Définir le nombre de rounds pour le hachage du mot de passe
  const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, saltRounds);

  try {
    const user = await UserModel.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      login: req.body.login,
      telephone: req.body.telephone,
      email: req.body.email,
      mot_de_passe: hashedPassword, // Stocker le mot de passe haché dans la base de données
      role: req.body.role,
      photo_profil: "../assets/images/photo_profil.png",
      genre: req.body.genre,
      autoriser: false,
    });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* module.exports.Login = async (req, res) => {
    const { login, mot_de_passe } = req.query;

    try {
        const utilisateur = await UserModel.findOne({ login, mot_de_passe });
        res.json(utilisateur);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur' });
    }
} */

module.exports.Login = (req, res, next) => {
  UserModel.findOne({ login: req.query.login })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.query.mot_de_passe, user.mot_de_passe)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            nom: user.nom,
            prenom: user.prenom,
            image_profil: user.photo_profil,
            role: user.role,
            autoriser: user.autoriser,
            email: user.email,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//tous les utilisateurs
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//Un utilisateur
module.exports.getUserById = async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Supprimer un utilisateur
module.exports.supprimerUtilisateur = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Supprimer l'équipement
    await UserModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la suppression de l'utilisateur :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la suppression de l'utilisateur",
    });
  }
};

//Bloquer ou débloquer un utilisateur

module.exports.bloquerDebloquer = async (req, res) => {
  const id = req.body.id; // ID du consommable à mettre à jour
  const autoriser = req.body.autoriser;
  try {
    // Recherche du consommable par son ID
    let user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour de la quantité en stock
    if (autoriser == true) {
      user.autoriser = false;
    } else if (autoriser == false) {
      user.autoriser = true;
    }

    // Enregistrement des modifications
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la mise à jour de l'utlisateur :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la mise à jour de l'utlisateur",
    });
  }
};

module.exports.updatePassword = async (req, res) => {
  const { utilisateurId, mot_de_passe_actuel, nouveau_mot_de_passe } = req.body;

  try {
    // Trouver l'utilisateur par son ID
    const user = await UserModel.findById(utilisateurId);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'actuel mot de passe est correct
    const passwordMatch = await bcrypt.compare(
      mot_de_passe_actuel,
      user.mot_de_passe
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    // Hacher et mettre à jour le nouveau mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nouveau_mot_de_passe, saltRounds);
    user.mot_de_passe = hashedPassword;

    // Sauvegarder les modifications dans la base de données
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Contrôleur pour la modification d'un utilisateur
/* module.exports.editUser = async (req, res) => {
  const saltRounds = 10; // Définir le nombre de rounds pour le hachage du mot de passe
  const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, saltRounds);
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    } else {
      const updateUser = await UserModel.findByIdAndUpdate(user, req.body, {
        new: true,
      });
      res.status(200).json(updateUser);
      console.log("réussi");
    }
  } catch (error) {
    console.log(error);
  }
}; */

module.exports.editUser = async (req, res) => {
  console.log("id", req.body.id);
  const id = req.body.id;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    // Vérifier si un nouveau mot de passe est fourni dans la requête
    if (req.body.mot_de_passe) {
      // Hasher le nouveau mot de passe avec bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        req.body.mot_de_passe,
        saltRounds
      );

      // Mettre à jour le mot de passe hashé dans les données à enregistrer
      req.body.mot_de_passe = hashedPassword;
    } else {
      // Si aucun nouveau mot de passe n'est fourni, retirer la clé mot_de_passe de la requête
      delete req.body.mot_de_passe;
    }

    // Mettre à jour les autres informations de l'utilisateur
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la modification de l'utilisateur",
      error,
    });
  }
};
