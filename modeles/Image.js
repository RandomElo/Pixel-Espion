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
            nomLien: {
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
        
    }
    // Ajouter les fonctions
    return Image;
}
