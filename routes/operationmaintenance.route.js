const express = require("express");
const {
  createOperationMaintenance,
  getAllOperationsMaintenance,
  aggregateOperationsMaintenance,
  aggregateOperationsMaintenance2,
  aggregateOperationsMaintenanceByEquipement,
  getLastMaintenance,
  updateMaintenance,
  addDepense,
} = require("../controllers/operationmaintenance.controller");
const router = express.Router();
const auth = require("../middleware/authentification/auth");

//Créer un utilisateur
router.post("/", auth, createOperationMaintenance);

//Selectionner toutes les opérations
router.get("/", auth, getAllOperationsMaintenance);

//agrégation
// router.get("/agregation", aggregateOperationsMaintenance)
router.get("/agregation2", auth, aggregateOperationsMaintenance2);
router.get(
  "/agregationbyequipement",
  auth,
  aggregateOperationsMaintenanceByEquipement
);
router.get("/lastmaintenance", auth, getLastMaintenance);
router.put("/update", auth, updateMaintenance);

//Ajouter une maintenance
router.put("/ajouter-depense/:id", auth, addDepense);

module.exports = router;
