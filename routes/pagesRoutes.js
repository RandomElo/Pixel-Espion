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
    const imagesUtilisateur = await req.Image.findAll({ where: { idUtilisateur: req.idUtilisateur } });
    res.render("gestion.ejs", { titre: "Gestion", css: "gestion", script: "gestion", imagesUtilisateur });
});
export default routeurPages;
