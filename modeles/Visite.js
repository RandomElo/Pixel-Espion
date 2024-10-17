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
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        { tableName: "Visites" }
    );
    Visite.enregistrement = async function (req, res) {
        try {
            const image = await req.Image.findOne({
                where: { nomFichier: req.url.split("/")[1] },
            });
            req.Visite.create({
                idImage: image.id,
                date: new Date(),
            });
        } catch (erreur) {
            return res.json({ enresitrer: false, erreur });
        }
    };
    return Visite;
}
