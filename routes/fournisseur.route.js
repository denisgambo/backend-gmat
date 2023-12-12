const express = require("express");
const {
  createFournisseur,
  getAllFournisseurs,
  updateFournisseur,
  deleteFournisseur,
} = require("../controllers/fournisseur.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer un utilisateur
router.post("/", auth, createFournisseur);

router.get("/", auth, getAllFournisseurs);
router.put("/fournisseur/:id", auth, updateFournisseur);
router.delete("/:id", auth, deleteFournisseur);

module.exports = router;
