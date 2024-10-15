export const accesibiliteBDD = (bdd) => {
    return (req, res, next) => {
        const { sequelize, Utilisateur, Image } = bdd;

        req.Sequelize = sequelize;
        req.Utilisateur = Utilisateur;
        req.Image = Image;

        next();
    };
};
