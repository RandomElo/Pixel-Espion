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
            <label for="lien">Lien de l'image :</label>
            <input name="lien" id="lien" type="text" required />
        </div>
        <div>
            <label for="image">Image :</label>
            <input name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg" required />
        </div>
        <div id="divErreur"></div>
        <button id="envoiBouton" class="lien" type="submit">Publier</button>
    </form>`;
        document.querySelector("#lien").addEventListener("input", async (e) => {
            if (e.target.value) {
                console.log(e.target.value);
                const donnee = {
                    lien: e.target.value,
                };
                const requete = await fetch("/image/verfication-lien", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(donnee),
                });
                if (requete.ok) {
                    const reponse = await requete.json();
                    console.log(reponse);
                } else {
                    alert("Problème lors de l'envoi de la requete");
                }
            }
        });
        document.querySelector("form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector("form"));

            const requete = await fetch("/image/ajout-image", {
                method: "POST",
                body: formData,
            });

            if (requete.ok) {
                const reponse = await requete.json();
                console.log(reponse);
            }
        });
    });
});
