import jwt from "jsonwebtoken";

export const verificationCookie = (req, res, next) => {
    if (req.cookies.utilisateur != undefined) {
        jwt.verify(req.cookies.utilisateur, process.env.CHAINE_JWT, (erreur, decoder) => {
            if (erreur) {
                res.clearCookie("utilisateur");
                res.redirect("/");
            } else {
                req.idUtilisateur = decoder.id;
            }
            next();
        });
    } else {
        next();
    }
};
