const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
//Definir un port
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.get("/user", (req, res) => {
    res.json({ message: "réussi" });
}) */

//Connexion à la base de données
const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Autoriser les requêtes provenant de http://localhost:8080
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
}); */

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", require("./routes/utilisateur.route"));
app.use("/categorie", require("./routes/categorie.route"));
app.use(
  "/categorieconsommable",
  require("./routes/categorie_consommable.route")
);

app.use("/localisation", require("./routes/localisation.route"));
app.use("/equipement", require("./routes/equipement.route"));
app.use("/consommation", require("./routes/consommation.route"));
app.use("/consommable", require("./routes/consommable.route"));
app.use("/approvisionnement", require("./routes/approvisionnement.route"));
app.use("/ligneapp", require("./routes/ligneapprovisionnement.route"));

app.use(
  "/operationmaintenance",
  require("./routes/operationmaintenance.route")
);
app.use("/fournisseur", require("./routes/fournisseur.route"));
app.use("/entreprise", require("./routes/entreprise.route"));
app.use("/service", require("./routes/service.route"));
app.use("/anomalie", require("./routes/anomalie.route"));
app.use("/maintenancier", require("./routes/maintenancier.route"));
app.use("/justification", require("./routes/justification.route"));
app.use("/connexion", require("./routes/connexion.route"));
app.use("/rebut", require("./routes/rebut.route"));
app.use("/demande_achat", require("./routes/demande_achat.route"));

// app.use("/test", require("./routes/test"));

//Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
