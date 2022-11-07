const state = () => {
    fetch("ajax-state.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            changeGameState(data);
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}
window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

const changeGameState = (data) => {

    if (data == "WAITING") {
        document.querySelector(".error-message").innerHTML = "WAITING";
    } else if (data == "LAST_GAME_WON") {
        window.location.href = "chat.php";
    } else if (data == "LAST_GAME_LOST") {
        window.location.href = "chat.php";
    } else {
        document.querySelector(".error-message").innerHTML = "";
        document.querySelector("#nameEnnemy").innerHTML = data["opponent"]["username"];
        document.querySelector("#nbMana").innerHTML = data["opponent"]["mp"];
        document.querySelector("#nbCarteleft").innerHTML = data["opponent"]["remainingCardsCount"];
        document.querySelector("#nbLifeMe").innerHTML = data["hp"];
        document.querySelector("#nbManaMe").innerHTML = data["mp"];
        document.querySelector("#nbCarteleftMe").innerHTML = data["remainingCardsCount"];
        document.querySelector("#remaningtime").innerHTML = data["remainingTurnTime"];

    }
}