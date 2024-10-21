import jwt from "jsonwebtoken";

export const verificationCookie = (req, res, next) => {
    if (req.cookies.utilisateur != undefined) {
        jwt.verify(req.cookies.utilisateur, process.env.CHAINE_JWT, async (erreur, decoder) => {
            if (erreur) {
                res.clearCookie("utilisateur");
                res.redirect("/");
            } else {
                const utilisateur = await req.Utilisateur.findByPk(decoder.id);
                if (utilisateur) {
                    req.idUtilisateur = decoder.id;
                    next();
                } else {
                    res.clearCookie("utilisateur");
                    res.redirect("/");
                }
            }
        });
    } else {
        next();
    }
};
