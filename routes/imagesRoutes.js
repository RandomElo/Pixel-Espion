import express from "express";
import { enregistrementFichier } from "../middlewares/multer.js";

import { verificationLien, enregistrement } from "../controleurs/imagesControleurs.js";

const routeurImages = express.Router();
routeurImages.post("/verfication-lien", verificationLien);
routeurImages.post("/ajout-image", enregistrementFichier, enregistrement);
export default routeurImages;
