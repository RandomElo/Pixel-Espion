import { DataTypes } from "sequelize";

export default function (bdd) {
    const Visite = bdd.define(
        "Visites",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idImage: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            typeVisiteur: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        { tableName: "Visites" }
    );
    Visite.enregistrement = async function (req, res, next) {
        try {
            const image = await req.Image.findOne({
                where: { nomFichier: req.url.split("/")[1] },
            });
            // Gestion de l'heure
            const date = new Date();
            let mois = "";
            switch (date.getMonth()) {
                case 0:
                    mois = "janvier";
                    break;

                case 1:
                    mois = "février";
                    break;

                case 2:
                    mois = "mars";
                    break;

                case 3:
                    mois = "avril";
                    break;

                case 4:
                    mois = "mai";
                    break;

                case 5:
                    mois = "juin";
                    break;

                case 6:
                    mois = "juillet";
                    break;

                case 7:
                    mois = "août";
                    break;

                case 8:
                    mois = "septembre";
                    break;

                case 9:
                    mois = "octobre";
                    break;

                case 10:
                    mois = "novembre";
                    break;

                case 11:
                    mois = "décembre";
                    break;

                default:
                    break;
            }
            let minutes = date.getMinutes();
            if (minutes.toString().split("").length == 1) {
                minutes = "0" + minutes;
            }
            const dateEntiere = date.getDate() + " " + mois + " " + date.getFullYear() + " à " + date.getHours() + "h" + minutes;
            // Fin de gestion de l'heure

            // Vérification par cookie
            let typeVisiteur;
            if (req.idUtilisateur == image.idUtilisateur) {
                typeVisiteur = "moi";
            } else {
                // Verification par adresse IP
                const utilisateur = await req.Utilisateur.findOne({ where: { id: image.idUtilisateur } });
                // utilisateur.adresseIp
                if (utilisateur.adresseIp == req.ip.slice(7)) {
                    typeVisiteur = "moi";
                } else {
                    typeVisiteur = "inconnu";
                }
            }
            await req.Visite.create({
                idImage: image.id,
                date: dateEntiere,
                typeVisiteur: typeVisiteur,
            });
        } catch (erreur) {
            console.error(erreur);
            return res.json({ enregistrer: false, erreur });
        }
    };
    Visite.changerTypeVisiteur = async (req, res) => {
        const image = await req.Image.findOne({
            where: { id: req.body.idImage },
        });
        if (image) {
            if (req.idUtilisateur == image.idUtilisateur) {
                await req.Visite.update({ typeVisiteur: req.body.valeur }, { where: { id: req.body.idVisite } });
                return res.json({ modification: true });
            } else {
                return res.json({ modification: false, erreur: "L'image ne vous appartient pas" });
            }
        } else {
            return res.json({ modification: false, erreur: "Image inexistante" });
        }
    };
    return Visite;
}
