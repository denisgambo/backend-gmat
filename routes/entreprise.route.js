const express = require("express");
const {
  CreateEntrprise,
  getEntreprise,
  updateEntreprise,
  setAccueilBackground,
  setDashbordBackground,
} = require("../controllers/entreprise.controller");
const router = express.Router();
const upload = require("../middleware/multer/entreprise");
const uploadAccueil = require("../middleware/multer/accueil_bacground");
const auth = require("../middleware/authentification/auth");
//Créer une catégorie
router.post("/", CreateEntrprise);

//Selectionner toutes les catégories
router.get("/", getEntreprise);
router.put("/:id", auth, upload, updateEntreprise);
router.put(
  "/accueil/background/:id",
  auth,
  uploadAccueil,
  setAccueilBackground
);
router.put(
  "/dashbord/background/:id",
  auth,
  uploadAccueil,
  setDashbordBackground
);

module.exports = router;
