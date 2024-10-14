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
            console.log(reponse);
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
    console.log(donnees);

    const requete = await fetch("/utilisateur/inscription", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        console.log(reponse);
    } else {
        alert("Un problème est survenue lors de l'envoi de la requete");
    }
});
