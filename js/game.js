const state = () => {
    fetch("ajax-state.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            checkGameState(data);
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}
window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

const checkGameState = (data) => {

    if (data == "WAITING")
        document.querySelector(".error-message").innerHTML = "WAITING";
    else if (data == "LAST_GAME_WON")
        window.location.href = "chat.php";
    else if (data == "LAST_GAME_LOST")
        window.location.href = "chat.php";
    else
        modifiyGameState(data);
}

const modifiyGameState = (data) => {
    // pour les textes de base -> null besoin de faire des append child -> on peut injecter directement notre data avec innerHtml
    document.querySelector(".error-message").innerHTML = "";
    document.querySelector("#name-ennemy").innerHTML = data["opponent"]["username"];
    document.querySelector("#nb-health").innerHTML = data["opponent"]["hp"];
    document.querySelector("#nb-mp").innerHTML = data["opponent"]["mp"];
    document.querySelector("#nb-cartes-text").innerHTML = data["opponent"]["remainingCardsCount"];
    document.querySelector("#nb-healthMe").innerHTML = data["hp"];
    document.querySelector("#nb-mpMe").innerHTML = data["mp"];
    document.querySelector("#nb-cartes-textMe").innerHTML = data["remainingCardsCount"];
}