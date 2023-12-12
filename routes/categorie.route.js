const express = require("express");
const {
  createCategorie,
  getAllCategories,
  modifierCategorie,
  getcats,
  supprimerCategorie,
} = require("../controllers/categorie.controller");
const router = express.Router();
const upload = require("../middleware/multer/categorie_equipement");
const auth = require("../middleware/authentification/auth");

//Créer une catégorie
router.post("/", upload, createCategorie);
router.get("/tous", auth, getcats);

//Selectionner toutes les catégories
router.get("/", auth, getAllCategories);

router.put("/modifier/:id", modifierCategorie);
//Supprimer une catégorie
router.delete("/supprimer/:id", auth, supprimerCategorie);

module.exports = router;
