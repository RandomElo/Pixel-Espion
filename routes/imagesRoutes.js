import express from "express";
import { enregistrementFichier } from "../middlewares/multer.js";

import { enregistrement } from "../controleurs/imagesControleurs.js";

const routeurImages = express.Router();
routeurImages.post('/ajout-image', enregistrementFichier, enregistrement)
export default routeurImages;
