document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const donnees = {
        pseudo: e.target[0].value,
        mdp: e.target[1].value,
    };
    const requete = await fetch("/utilisateur/connexion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.connecte) {
            window.location.href = "gestion";
        } else {
            alert("Erreur lors de l'envoie de la requete de connexion");
            console.error(reponse.erreur);
        }
    } else {
        alert("Erreur lors de l'envoi de la requete de connexion");
    }
});
