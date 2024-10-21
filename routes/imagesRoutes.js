import express from "express";
import { enregistrementFichier } from "../middlewares/multer.js";

import { enregistrement, modificationTypeVisiteur } from "../controleurs/imagesControleurs.js";

const routeurImages = express.Router();
routeurImages.post("/ajout-image", enregistrementFichier, enregistrement);
routeurImages.post("/modification-type-visiteur", modificationTypeVisiteur)
export default routeurImages;
