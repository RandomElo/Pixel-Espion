import { Sequelize } from "sequelize";

import Utilisateur from "../modeles/Utilisateur.js";

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
};

bdd.sequelize.sync().catch((erreur) => {
    console.error(erreur);
});

export default bdd;