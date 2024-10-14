import express from "express";

import { verificationDisponiblite, inscription, connexion } from "../controleurs/utilisateursControleur.js";

const routeurUtilisateurs = express.Router();

routeurUtilisateurs.post("/verification-disponiblite", verificationDisponiblite);
routeurUtilisateurs.post("/inscription", inscription);
routeurUtilisateurs.post("/connexion", connexion);

export default routeurUtilisateurs;
