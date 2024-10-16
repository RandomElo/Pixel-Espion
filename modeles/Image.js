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
            nomImage: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            nomFichier: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
        },
        {
            tableName: "Images",
        }
    );

    Image.enregistrement = async function (req, res) {
        console.log("id utilisateur "+req.idUtilisateur)
        try {
            req.Image.create({
                idUtilisateur: req.idUtilisateur,
                nomImage: req.body.nom,
                nomFichier: req.file.filename,
            });
            return res.json({ enregistrer: true });
        } catch (erreur) {
            return res.json({ enregistrer: false, erreur });
        }
    };
    // Ajouter les fonctions
    return Image;
}
