const express = require("express");
const {
  createService,
  getServices,
  supprimerService,
  modifierService,
} = require("../controllers/service.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createService);

//recuperer un utilisateur

router.get("/:id");

//Tous les utilisateurs
router.get("/", auth, getServices);
//Spprimer un utilisateur
router.delete("/:id", auth, supprimerService);

//Bloquer ou débloquer un utilisateur
router.put("/modifier/:id", auth, modifierService);

module.exports = router;
