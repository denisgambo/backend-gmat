const express = require("express");
const {
  createMaintenancier,
  getAllMaintenanciers,
  supprimerMaintenanciers,
  modifierMaintenancier,
} = require("../controllers/maintenancier.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createMaintenancier);

//recuperer un utilisateur

router.get("/", auth, getAllMaintenanciers);

router.delete("/:id", auth, supprimerMaintenanciers);
router.put("/modifier/:id", auth, modifierMaintenancier);

module.exports = router;
