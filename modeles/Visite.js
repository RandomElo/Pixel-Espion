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

            await req.Visite.create({
                idImage: image.id,
                date: dateEntiere,
            });
        } catch (erreur) {
            console.error(erreur);
            return res.json({ enregistrer: false, erreur });
        }
    };
    return Visite;
}
