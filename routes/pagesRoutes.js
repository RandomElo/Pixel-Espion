import express from "express";
const routeurPages = express.Router();

routeurPages.get("/", (req, res) => {
    res.render("accueil.ejs", { titre: "Accueil", css: "accueil", script: "" });
});
routeurPages.get("/inscription", (req, res) => {
    if (!req.cookies.utilisateur) {
        res.render("pageIdentification.ejs", { titre: "Inscription", css: "pageIdentification", script: "inscription", mode: "Inscription" });
    } else {
        res.redirect("/gestion")
    }
});
routeurPages.get("/connexion", (req, res) => {
    res.render("pageIdentification.ejs", { titre: "Connexion", css: "pageIdentification", script: "connexion", mode: "Connexion" });
});
routeurPages.get("/gestion", (req, res) => {
    if (req.cookies.utilisateur) {
        res.render("gestion.ejs", { titre: "Gestion", css: "gestion", script: "gestion" });
    } else {
        res.redirect("/connexion");
    }
});
export default routeurPages;
