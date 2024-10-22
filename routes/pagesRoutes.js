import express from "express";
import { controleAcces } from "../middlewares/controleAcces.js";

const routeurPages = express.Router();

routeurPages.get("/", (req, res) => {
    res.render("accueil.ejs", { titre: "Accueil", css: "accueil", script: "", cdn: "", cookieUtiliateur: req.idUtilisateur });
});
routeurPages.get("/accueil", (req, res) => {
    res.redirect("/");
});
routeurPages.get("/inscription", controleAcces("nonConnecte"), (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Inscription", css: "pageIdentification", script: "inscription", mode: "Inscription", cdn: "", cookieUtiliateur: req.idUtilisateur });
});
routeurPages.get("/connexion", controleAcces("nonConnecte"), (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Connexion", css: "pageIdentification", script: "connexion", mode: "Connexion", cdn: "", cookieUtiliateur: req.idUtilisateur });
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
    // res.json({ imagesUtilisateur });
    res.render("gestion.ejs", { titre: "Gestion", css: "gestion", script: "gestion", imagesUtilisateur, cdn: ["https://cdn.jsdelivr.net/npm/lightbox2@2.11.3/dist/css/lightbox.min.css"], cookieUtiliateur: req.idUtilisateur });
});
routeurPages.get("/limites-projet", (req, res) => {
    res.render("limitesProjet.ejs", { titre: "Limites du projet", css: "limitesProjet", script: "", cdn: "", cookieUtiliateur: req.idUtilisateur });
});
export default routeurPages;
