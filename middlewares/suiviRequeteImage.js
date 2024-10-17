export const suiviAcces = () => {
    return (req, res, next) => {
        console.log("Adresse IP : " + req.ip); // IP
        // console.log(req.hostname);
        console.log("URL de recherche : " + req.url);
        if (req.idUtilisateur) {
            console.log("l'utilisateur est : " + req.idUtilisateur);
        }
        // Zone d etest
        let date = new Date();
        console.log(date);
        console.log("Date :");
        console.log(date.getDate());
        // Récupéré le mois - Commence à 0
        console.log(date.getMonth());
        //Récupéré l'année
        console.log(date.getFullYear());
        console.log("Heure : ");
        console.log(date.getHours());
        console.log(date.getMinutes());

        req.Visite.enregistrement(req, res);

        next();
    };
};
