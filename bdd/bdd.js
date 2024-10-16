import { Sequelize } from "sequelize";

import Utilisateur from "../modeles/Utilisateur.js";
import Image from "../modeles/Image.js";

const sequelize = new Sequelize("bdd", process.env.DB_UTILISATEUR, process.env.DB_MDP, {
    dialect: "sqlite",
    storage: "./bdd.sqlite",
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});
const bdd = {
    sequelize,
    Utilisateur: Utilisateur(sequelize),
    Image: Image(sequelize),
};

bdd.Utilisateur.hasMany(bdd.Image, {
    foreignKey: "idUtilisateur", // Champ de la table Image
    sourceKey: "id", // Champ de la table Utilisateur
});
bdd.Image.belongsTo(bdd.Utilisateur, {
    foreignKey: "idUtilisateur", // Champ de la table Image
    targetKey: "id", // Champ de la table Utilisateur
});

bdd.sequelize.sync().catch((erreur) => {
    console.error(erreur);
});

export default bdd;
