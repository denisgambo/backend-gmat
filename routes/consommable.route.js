const express = require("express");
const {
  createConsommable,
  getAllConsommables,
  getConsommableByCategorie,
  updateConsommableQuantite,
  getConsommableById,
  updateConsommable,
  supprimerConsommable,
  getAllConsommablesCritique,
} = require("../controllers/consammable.controller");
const upload = require("../middleware/multer/consommable");
const auth = require("../middleware/authentification/auth");

const router = express.Router();

//Créer un consommable
router.post("/", upload, createConsommable);

//Selectionner tous les consommables
router.get("/", auth, getAllConsommables);

router.get("/consommablescategorie", auth, getConsommableByCategorie);

//Augmenter la quantite
router.put("/update", auth, updateConsommableQuantite);

//Selectionner un consommable par id
router.get("/select/:id", auth, getConsommableById);

// Modifier un consommable
router.put("/:id", updateConsommable);

//Supprimer un consommable
router.delete("/supprimer/:id", auth, supprimerConsommable);

//seuil critique
router.get("/critique", auth, getAllConsommablesCritique);

module.exports = router;
