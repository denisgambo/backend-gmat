const express = require("express");
const {
  createCategorieConsommable,
  getAllCategoriesConsommables,
  modifierCategorieConsommable,
  getcats,
  getAllCategories,
  supprimerCategorie,
} = require("../controllers/categorie_consommable.controller");
const upload = require("../middleware/multer/categorie_consommable");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer une catégorie
router.post("/", upload, createCategorieConsommable);

//Selectionner toutes les catégories
router.get("/", auth, getAllCategories);

router.get("/tous", auth, getAllCategories);
router.put("/modifier/:id", modifierCategorieConsommable);

//Supprimer une catégorie
router.delete("/supprimer/:id", auth, supprimerCategorie);

module.exports = router;
