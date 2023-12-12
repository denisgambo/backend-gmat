const rebutSchema = require("../models/rebut.model")



//Créer une mise au rebut

module.exports.createRebut = async (req, res) => {
 try {
       const rebut = await rebutSchema.create({
        ...req.body,
    });
    res.status(200).json(rebut);
 } catch (error) {
    res.status(500).json({message:"Une erreur s'est produit"});
    console.log(error)
 }
};

//tous les rebuts
module.exports.getRebuts= async (req, res, next) => {
    try {
        const rebuts = await rebutSchema.find();
        res.status(200).json(rebuts);
    } catch (error) {
        next(error);
    }
};