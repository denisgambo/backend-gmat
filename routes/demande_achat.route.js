const express = require("express");

const auth = require("../middleware/authentification/auth");
const {
  createDemandeAchat,
  getAllDemandesAchat,
  createLigneDemandeAchat,
  getAllLignesAchat,
  ValiderInvalier,
} = require("../controllers/demande_achat.controller");
const router = express.Router();

// router.get("/lignes_demandes", getAllLignesAchat);
//Toutes les demandes
router.get("/", auth, getAllDemandesAchat);

//Créer une ligne de demande
router.post("/lignedemande", auth, createLigneDemandeAchat);
//Créer une demande
router.post("/", auth, createDemandeAchat);

//dernier approvisionnement
// router.get("/last", getLastApprovisionnement);
//Bloquer ou débloquer un utilisateur
router.put("/validation", auth, ValiderInvalier);
router.put("/traiter", auth, ValiderInvalier);

module.exports = router;
