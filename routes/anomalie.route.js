const express = require("express");
const {
  createAnomalie,
  getAnomalies,
  supprimerAnomalies,
  modifierAnnomalie,
} = require("../controllers/anomalie.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer une anomalie
router.post("/", auth, createAnomalie);

//recuperer  une anomalie

router.get("/:id");

//Toutes les anomalies
router.get("/", auth, getAnomalies);
//Spprimer une anomalie
router.delete("/:id", auth, supprimerAnomalies);

//Bloquer ou débloquer un utilisateur
router.put("/modifier/:id", auth, modifierAnnomalie);

module.exports = router;
