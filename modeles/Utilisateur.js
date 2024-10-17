import { DataTypes } from "sequelize";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            adressesIp: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "Utilisateurs",
        }
    );
    Utilisateur.pseudoDisponible = async function (req, res) {
        req.Utilisateur.findOne({
            where: {
                pseudo: req.body.pseudo,
            },
        }).then((utilisateur) => {
            if (utilisateur) {
                return res.json({ disponible: false });
            } else {
                return res.json({ disponible: true });
            }
        });
    };
    Utilisateur.inscription = async function (req, res) {
        try {
            req.Utilisateur.findOne({ where: { pseudo: req.body.pseudo } }).then((utilisateur) => {
                if (utilisateur) {
                    return res.json({ connecte: false, erreur: "Pseudo déjà existant" });
                }
            });

            const motDePasseHash = await bcrypt.hash(req.body.mdp, 12);
            const utilisateur = await req.Utilisateur.create({
                pseudo: req.body.pseudo,
                motDePasse: motDePasseHash,
                adressesIp: req.ip,
            });
            return await req.Utilisateur.generationToken(res, utilisateur.id);
        } catch (erreur) {
            console.error(erreur);
            return res.json({ connecte: false, erreur });
        }
    };
    Utilisateur.connexion = async function (req, res) {
        const utilisateur = await req.Utilisateur.findOne({ where: { pseudo: req.body.pseudo } });
        if (!utilisateur) {
            return res.json({ connecte: true, erreur: "Pseudo ou mot de passe incorrect" });
        }
        if (bcrypt.compare(req.body.mdp, utilisateur.motDePasse)) {
            await req.Utilisateur.update({ adressesIp: req.id }, { where: { id: utilisateur.id } });
            return await req.Utilisateur.generationToken(res, utilisateur);
        } else {
            return res.json({ connecte: true, erreur: "Pseudo ou mot de passe incorrect" });
        }
    };
    Utilisateur.generationToken = async function (res, utilisateur) {
        const tokenJWT = jwt.sign({ id: utilisateur.id, adressesIp: utilisateur.adressesIp }, process.env.CHAINE_JWT, {
            expiresIn: "72h",
        });
        return res
            .cookie("utilisateur", tokenJWT, {
                maxAge: 72 * 60 * 60 * 24 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            })
            .json({ connecte: true });
    };
    return Utilisateur;
}
