export const accesibiliteBDD = (bdd) => {
    return (req, res, next) => {
        const { sequelize, Utilisateur, Image, Visite } = bdd;

        req.Sequelize = sequelize;
        req.Utilisateur = Utilisateur;
        req.Image = Image;
        req.Visite = Visite;

        next();
    };
};
