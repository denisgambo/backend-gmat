const express = require("express");
const {
  createLigneApprovisionnement,
} = require("../controllers/ligneapprovisionnement.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createLigneApprovisionnement);

module.exports = router;
