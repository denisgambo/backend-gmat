const Connexion = require('../models/connexion.model');

// Contrôleur pour enregistrer la connexion de l'utilisateur
exports.enregistrerConnexion = async (req, res) => {
    try {
        // Récupérez l'utilisateur connecté à partir de la requête (vous devrez adapter cela en fonction de votre implémentation)
        const utilisateur = req.body;
        console.log(req.body)

        // Créez un nouvel enregistrement de connexion avec la date et l'heure actuelles
        const connexion = new Connexion({
            date_connexion: new Date(),
            utilisateur: utilisateur,
        });

        // Enregistrez le nouvel enregistrement de connexion dans la base de données
        await connexion.save();

        // Répondez avec un message de succès
        res.json({ message: 'Connexion enregistrée avec succès.' });
    } catch (error) {
        // En cas d'erreur, répondez avec le message d'erreur
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la connexion.' });
    }
};

// Contrôleur pour enregistrer la déconnexion de l'utilisateur
exports.enregistrerDeconnexion = async (req, res) => {
    try {
        // Récupérez l'utilisateur déconnecté à partir de la requête (vous devrez adapter cela en fonction de votre implémentation)
        const utilisateur = req.body;
        console.log("Deconnexion", utilisateur)

        // Recherchez le dernier enregistrement de connexion de l'utilisateur dans la base de données
        const dernierConnexion = await Connexion.findOne({ utilisateur }).sort({ date_connexion: -1 });

        // Vérifiez si l'utilisateur était déjà connecté
        if (dernierConnexion && !dernierConnexion.date_deconnexion) {
            // Si l'utilisateur était connecté, enregistrez la date et l'heure de déconnexion
            dernierConnexion.date_deconnexion = new Date();
            await dernierConnexion.save();
        }

        // Répondez avec un message de succès
        res.json({ message: 'Déconnexion enregistrée avec succès.' });
    } catch (error) {
        // En cas d'erreur, répondez avec le message d'erreur
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la déconnexion.' });
    }
};

//toules les connexions
/* module.exports.getConnexions= async (req, res, next) => {
    try {
        const connexions = await Connexion.find();
        res.status(200).json(connexions);
    } catch (error) {
        next(error);
    }
}; */


// Contrôleur pour obtenir toutes les connexions regroupées par utilisateur
exports.getConnexions = async (req, res, next) => {
    try {
        const connexions = await Connexion.aggregate([
            {
                $group: {
                    _id: "$utilisateur", // Regroupe les connexions par le champ "utilisateur"
                    connexions: { $push: "$$ROOT" }, // Stocke toutes les connexions dans un tableau "connexions"
                },
            },
        ]);

        res.status(200).json(connexions);
    } catch (error) {
        next(error);
    }
};

