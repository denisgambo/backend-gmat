const express = require("express");
const {
  createConsommation,
  statisticsConsommation,
  getLastConsommation,
  getConsommationByConsommable,
  getConsommationByEquipement,
} = require("../controllers/consommation.controller");
const auth = require("../middleware/authentification/auth");
const {
  supprimerConsommable,
} = require("../controllers/consammable.controller");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createConsommation);

//statistiques des consommation
router.get("/statisticconsommation", auth, statisticsConsommation);

router.get("/lastconsommation", auth, getLastConsommation);

//La consommation par consommables
router.get("/parconsommable", auth, getConsommationByConsommable);

//La consommation par equipement
router.get("/parequipement", auth, getConsommationByEquipement);

module.exports = router;
