const express = require("express");
const { createRebut, getRebuts } = require("../controllers/rebut.controller");
const auth = require("../middleware/authentification/auth");

const router = express.Router();

//Créer une anomalie
router.post("/", auth, createRebut);

//recuperer  une anomalie

// router.get("/:id", );

//Toutes les anomalies
router.get("/", auth, getRebuts);
//Spprimer une anomalie
// router.delete("/:id", supprimerAnomalies)

//Bloquer ou débloquer un utilisateur
// router.put("/modifier/:id", modifierAnnomalie)

module.exports = router;
