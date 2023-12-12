const express = require("express");
const {
  createApprovisionnement,
  getLastApprovisionnement,
  getAllApprovisionnements,
} = require("../controllers/approvisionnement.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createApprovisionnement);

//dernier approvisionnement
router.get("/last", auth, getLastApprovisionnement);

//historique approvisionnements
router.get("/", auth, getAllApprovisionnements);
module.exports = router;
