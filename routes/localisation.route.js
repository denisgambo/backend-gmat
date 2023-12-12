const express = require("express");
const {
  createLocalisation,
  getAllLocalite,
} = require("../controllers/localisation.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createLocalisation);

//Charger toutes les localites
router.get("/", auth, getAllLocalite);

module.exports = router;
