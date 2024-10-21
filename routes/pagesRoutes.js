import express from "express";
import { controleAcces } from "../middlewares/controleAcces.js";

const routeurPages = express.Router();

routeurPages.get("/", (req, res) => {
    res.render("accueil.ejs", { titre: "Accueil", css: "accueil", script: "" });
});
routeurPages.get("/inscription", controleAcces("nonConnecte"), (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Inscription", css: "pageIdentification", script: "inscription", mode: "Inscription" });
});
routeurPages.get("/connexion", controleAcces("nonConnecte"), (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Connexion", css: "pageIdentification", script: "connexion", mode: "Connexion" });
});
routeurPages.get("/gestion", controleAcces("connecte"), async (req, res) => {
    const imagesUtilisateur = await req.Image.findAll({ where: { idUtilisateur: req.idUtilisateur }, raw: true });
    // Je crée un tableau avec toute les id des images
    const imageId = imagesUtilisateur.map((img) => img.id);
    // Je récupérer toute les images dont les ids sont présent dasn imageId
    const visiteImage = await req.Visite.findAll({ where: { idImage: imageId }, raw: true });
    // Je parcours chaque image de l'utilisateur
    imagesUtilisateur.forEach((image) => {
        // Je récupére toutes les visite qui on comme id celle de la photo
        image.visites = visiteImage.filter((visites) => visites.idImage == image.id);
    });
    // res.json({imagesUtilisateur})
    res.render("gestion.ejs", { titre: "Gestion", css: "gestion", script: "gestion", imagesUtilisateur });
});
export default routeurPages;
