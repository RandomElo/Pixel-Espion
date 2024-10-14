import express from "express";
const routeurPages = express.Router();

routeurPages.get("/", (req, res) => {
    res.render("accueil.ejs", { titre: "Accueil", css: "accueil", script: "" });
});
routeurPages.get("/inscription", (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Inscription", css: "pageIdentification", script: "inscription", mode: "Inscription" });
});
routeurPages.get("/connexion", (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Connexion", css: "pageIdentification", script: "connexion", mode: "Connexion" });
});
export default routeurPages;
