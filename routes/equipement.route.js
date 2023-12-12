const express = require("express");
const {
  createEquipement,
  getAllEquipements,
  getEquipementsByCategorie,
  getEquipementsByCategorie2,
  getAllEquipementsWithCategorieName,
  calculerNombreEquipementsParCategorie,
  calculerNombreEquipementsParCategorieEtLocalite,
  calculerNombreEquipementsParCategorieEtLocaliteIndispo,
  updateEquipementDisponibilite,
  supprimerEquipement,
  getEquipementById,
  updateEquipement,
  getEquipementAuRebut,
} = require("../controllers/equipement.controller");
const auth = require("../middleware/authentification/auth");
const router = express.Router();
const upload = require("../middleware/multer/equipement");
// const multer = require("multer");

//Créer un utilisateur
router.post("/", upload, createEquipement);

//Selectionner tous les équipements
router.get("/", auth, getAllEquipements);
router.get("/equipementscategorie", auth, getEquipementsByCategorie2);
router.get("/au_rebut", auth, getEquipementAuRebut);

//Avec les categories
router.get("/equipementswithcat", auth, getAllEquipementsWithCategorieName);

//Nombre d'équipements par catégorie
router.get("/nbrequipementbycat", auth, calculerNombreEquipementsParCategorie);

router.get(
  "/equipementswithcatandloc",
  auth,
  calculerNombreEquipementsParCategorieEtLocalite
);

router.get(
  "/equipementindisponibles",
  auth,
  calculerNombreEquipementsParCategorieEtLocaliteIndispo
);
//Mettre à jour la disponibilité
router.put("/updatedisponibilite", auth, updateEquipementDisponibilite);

//Supprimer l'équipement
router.delete("/supprimer/:id", auth, supprimerEquipement);

//Selectionner un équipement par id l'équipement
router.get("/:id", auth, getEquipementById);

// Modifier un équipement
router.put("/:id", upload, updateEquipement);

module.exports = router;
