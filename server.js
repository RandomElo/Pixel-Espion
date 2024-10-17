import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import bdd from "./bdd/bdd.js";

// Middlewares
import { accesibiliteBDD } from "./middlewares/accessibliteBDD.js";
import { verificationCookie } from "./middlewares/verificationCookie.js";
import { controleAcces } from "./middlewares/controleAcces.js";
import { suiviAcces } from "./middlewares/suiviRequeteImage.js";

// Routes
import routeurPages from "./routes/pagesRoutes.js";
import routeurUtilisateurs from "./routes/utilisateursRoutes.js";
import routeurImages from "./routes/imagesRoutes.js";

dotenv.config();

const port = 8100;
const app = express();

// Gestion du CORS
app.use(
    cors({
        origin: "*", //Toutes les origines sont auroisées
        options: "GET,POST,PATCH,PUT,DELETE", //Les méthodes autorisées
        allowedHeaders: "Content-type,Autorization", //Les en-têtes autorisé
        credentials: true, //Les informations d'authorisation doivent être envoyées lors de la demande de cross origini
    })
);
app.use(express.json());

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(accesibiliteBDD(bdd));
app.use(verificationCookie);


// Gestion des chemins d'accès
app.use("/", express.static(path.join(process.cwd(), "public")));
app.use("/public", express.static(path.join(process.cwd(), "public/elements")));
app.use("/img", suiviAcces(), express.static(path.join(process.cwd(), "public/data")));

// Gestion des routes
app.use("/", routeurPages);
app.use("/utilisateur", routeurUtilisateurs);
app.use("/image", controleAcces("connecte"), routeurImages);

app.listen(port, () => console.log("Serveur démarré => port " + port));
