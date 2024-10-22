document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#divResultat").innerHTML = /*html*/ `
    <div id="divBoutonAjouterElement">
        <a id="boutonAjouterElement" class="lien">Ajouter un élément</a>
    </div>`;
    document.querySelector("#boutonAjouterElement").addEventListener("click", () => {
        document.querySelector("#divResultat").innerHTML = /*html*/ `<form>
        <div>
            <label for="nom">Nom de l'image :</label>
            <input name="nom" id="nom" type="text" required />
        </div>
        <div>
            <label for="image">Image :</label>
            <input name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg" required />
        </div>
        <div id="divErreur"></div>
        <button id="envoiBouton" class="lien" type="submit">Publier</button>
    </form>`;
        document.querySelector("form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector("form"));

            const requete = await fetch("/image/ajout-image", {
                method: "POST",
                body: formData,
            });

            if (requete.ok) {
                const reponse = await requete.json();
                if (reponse.enregistrer) {
                    window.location.reload(true);
                } else {
                    alert("Une erreur est survenue lors de l'enregistrement de l'image");
                }
            } else {
                alert("La requêtre d'enregistrement à échouée");
            }
        });
    });
});
if (document.querySelector("table")) {
    document.querySelectorAll(".boutonDetails").forEach((bouton) => {
        bouton.addEventListener("click", (e) => {
            console.log(e.target.dataset.id);
        });
    });
}
if (document.querySelectorAll(".typeUtilisateur")) {
    document.querySelectorAll(".typeUtilisateur").forEach((select) => {
        select.addEventListener("change", async (e) => {
            const donnees = {
                idImage: e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id,
                idVisite: e.target.parentNode.parentNode.dataset.id,
                valeur: e.target.value,
            };
            const requete = await fetch("/image/modification-type-visiteur", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donnees),
            });
            if (requete.ok) {
                const reponse = await requete.json();
                if (reponse.modification) {
                    location.reload(true);
                } else {
                    alert(reponse.erreur);
                }
            } else {
                alert("Une erreur est survenue lors de la requete");
            }
        });
    });
}
