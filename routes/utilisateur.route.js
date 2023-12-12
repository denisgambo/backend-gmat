const express = require("express");
const router = express.Router();
const {
  createUser,
  Login,
  getAllUsers,
  supprimerUtilisateur,
  bloquerDebloquer,
  getUserById,
  updatePassword,
  editUser,
} = require("../controllers/utilisateur.controller");
const auth = require("../middleware/authentification/auth");

//Créer un utilisateur
router.post("/sinup", auth, createUser);

//recuperer un utilisateur

router.get("/login", Login);

//Tous les utilisateurs
router.get("/", auth, getAllUsers);
//Spprimer un utilisateur
router.delete("/supprimer/:id", auth, supprimerUtilisateur);
//Modifier utilisateur
router.put("/modifier/:id", editUser);

//Bloquer ou débloquer un utilisateur
router.put("/autorisation", auth, bloquerDebloquer);

//Un utilisateur
router.get("/:id", auth, getUserById);

//Mise à jour de mot de passe

router.put("/updatepassword", auth, updatePassword);

module.exports = router;
