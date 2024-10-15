export const verificationLien = (req, res) => {
    req.Image.verificationDispoLien(req, res);
};
export const enregistrement = (req, res) => {
    console.log(req.file.filename); // nom du fichier
    console.log(req.body.nom);
    console.log(req.body.lien);
};
