import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
export default function (bdd) {
    const Utilisateur = bdd.define(
        "Utilisateurs",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            pseudo: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            motDePasse: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "Utilisateurs",
        }
    );
    Utilisateur.inscription = async function (req,pseudo, motDePasse) {
        bcrypt.hash(motDePasse, 12).then((motDePasseHash) => {
            req.Utilisateur.create({
                pseudo: pseudo,
                mdp: motDePasseHash,
            })
                .then((utilisateur) => {
                    console.log("c'est bon");
                })
                .catch((erreur) => {
                    console.error(erreur);
                });
        });
    };
    Utilisateur.connexion = async function (pseudo, motDePasse) {
        console.log("test");
    };
    Utilisateur.pseudoDisponible = async function (req, pseudo) {
        req.Utilisateur.findOne({
            where: {
                pseudo: pseudo,
            },
        }).then((utilisateur) => {
            if (utilisateur) {
                console.log("il y a un utilisateur");
                return true;
            } else {
                console.log("il y a pas d'utilisateur");
                return false;
            }
        });
    };
    return Utilisateur;
}
