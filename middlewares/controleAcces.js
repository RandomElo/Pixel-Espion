export const controleAcces = (mode) => {
    return (req, res, next) => {
        if (mode == "connecte") {
            if (!req.idUtilisateur) {
                res.redirect("/connexion");
            } else {
                next();
            }
        } else if (mode == "nonConnecte") {
            if (req.idUtilisateur) {
                res.redirect("/gestion");
            } else {
                next();
            }
        } else if (mode == "administrateur") {
            console.log("je veut que tu soit admin");
            next();
        } else {
            next();
        }
    };
};
