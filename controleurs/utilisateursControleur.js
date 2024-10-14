import bcrypt from "bcrypt";
export const verificationDisponiblite = (req, res) => {
    if (req.Utilisateur.pseudoDisponible(req, req.body.pseudo)) {
        res.json({ disponiblite: true });
    } else {
        res.json({ disponiblite: false });
    }
};

export const inscription = (req, res) => {
    const reponse = req.Utilisateur.inscription(req, req.body.pseudo, req.body.mdp);
    res.json({ reponse: reponse });
};
