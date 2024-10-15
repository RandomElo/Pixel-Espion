import { DataTypes } from "sequelize";
export default function (bdd) {
    const Image = bdd.define(
        "Images",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idUtilisateur: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nomFichier: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            lien: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
        },
        {
            tableName: "Images",
        }
    );
    Image.verificationDispoLien = async function (req, res) {
        req.Image.findOne({
            where: { lien: req.body.lien },
        }).then((image) => {
            if (image) {
                return res.json({ disponible: false });
            } else {
                return res.json({ disponible: true });
            }
        });
    };
    Image.enregistrement = async function (req, res) {};
    // Ajouter les fonctions
    return Image;
}
