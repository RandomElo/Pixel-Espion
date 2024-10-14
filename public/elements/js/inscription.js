document.querySelector("#pseudo").addEventListener("input", async (e) => {
    if (e.target.value) {
        const donnee = {
            pseudo: e.target.value,
        };
        const requete = await fetch("/utilisateur/verification-disponiblite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnee),
        });
        if (requete.ok) {
            const reponse = await requete.json();
            const boutonEnvoi = document.querySelector("#boutonEnvoi");
            if (reponse.disponible) {
                document.querySelector("#messageErreur").textContent = "";
                boutonEnvoi.disabled = true;
                boutonEnvoi.style.opacity = "1";
                boutonEnvoi.style.cursor = "pointer";
            } else {
                document.querySelector("#messageErreur").textContent = "Pseudo indisponible";
                boutonEnvoi.disabled = true;
                boutonEnvoi.style.opacity = "0.6";
                boutonEnvoi.style.cursor = "default";
            }
        } else {
            alert("Un problème est survenue lors de l'envoi de la requete");
        }
    }
});
document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const donnees = {
        pseudo: e.target[0].value,
        mdp: e.target[1].value,
    };

    const requete = await fetch("/utilisateur/inscription", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.connecte) {
            // redirection
        } else {
            alert("Une erreur est survenue lors de la création du compte");
            console.error(reponse.erreur);
        }
    } else {
        alert("Un problème est survenue lors de l'envoi de la requete");
    }
});
