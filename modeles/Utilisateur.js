import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default function (bdd) {
    // Définition de la table

    // Méthode de création de compte
    Utilisateur.creerCompte = async function (pseudo, motDePasse) {
        try {
            const nouvelUtilisateur = await Utilisateur.create({
                pseudo_utilisateur: pseudo,
                mdp_utilisateur: motDePasse,
            });
            return nouvelUtilisateur;
        } catch (error) {
            throw new Error("Erreur lors de la création du compte : " + error.message);
        }
    };

    // Méthode de connexion
    Utilisateur.connexion = async function (pseudo, motDePasse) {
        try {
            const utilisateur = await Utilisateur.findOne({
                where: { pseudo_utilisateur: pseudo },
            });
            if (!utilisateur) {
                throw new Error("Utilisateur non trouvé");
            }

            const mdpValide = await bcrypt.compare(motDePasse, utilisateur.mdp_utilisateur);
            if (!mdpValide) {
                throw new Error("Mot de passe incorrect");
            }

            return utilisateur;
        } catch (error) {
            throw new Error("Erreur lors de la connexion : " + error.message);
        }
    };

    return Utilisateur;
}
