const express = require("express");
const {
  createJustification,
  getJustificationById,
  getJustifications,
  supprimerJustification,
  modifierJustification,
} = require("../controllers/justification.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();

//Créer une justification
router.post("/", auth, createJustification);

//recuperer  une justification

router.get("/:id", auth, getJustificationById);

//Toutes les justifications
router.get("/", auth, getJustifications);
//Spprimer une justification
router.delete("/:id", auth, supprimerJustification);
router.put("/modifier/:id", auth, modifierJustification);

module.exports = router;
