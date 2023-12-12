const express = require("express");
const {
  enregistrerConnexion,
  enregistrerDeconnexion,
  getConnexions,
} = require("../controllers/connexion.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();
/* const connexionController = require('../controllers/connexion.controller');
 */
// Route pour enregistrer la connexion de l'utilisateur
router.post("/connexion", enregistrerConnexion);

// Route pour enregistrer la déconnexion de l'utilisateur
router.post("/deconnexion", enregistrerDeconnexion);

// Route pour recuperer les connexions
router.get("/", getConnexions);

module.exports = router;
