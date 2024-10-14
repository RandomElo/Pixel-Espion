import express from "express";

import { verificationDisponiblite, inscription } from "../controleurs/utilisateursControleur.js";

const routeurUtilisateurs = express.Router();

routeurUtilisateurs.post("/verification-disponiblite", verificationDisponiblite);
routeurUtilisateurs.post("/inscription", inscription);

export default routeurUtilisateurs;
