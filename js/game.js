const state = () => {
    fetch("ajax-game.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {


            console.log(data);
            checkGameState(data);

            const endturn = document.querySelector("#endturn");
            endturn.addEventListener('click', () => {
                statePlay("END_TURN");
            });
            const surrender = document.querySelector("#surrender");
            endturn.addEventListener('click', () => {
                statePlay("SURRENDER");
            });


            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}

const statePlay = (e) => {
    let data = new FormData();

    data.append("type", e);

    fetch("ajax-play.php",{
        method : "post",
        body : data
    })
    .then(response => response.json())
};

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    //statePlay(); // Appel initial (attendre 1 seconde)
});

const checkGameState = (data) => {

    if (data != null) {
        if (data == "WAITING")
            document.querySelector(".error-message").innerHTML = "WAITING";
        else if (data == "LAST_GAME_WON")
            window.location.href = "chat.php";
        else if (data == "LAST_GAME_LOST")
            window.location.href = "chat.php";
        else
            modifiyGameState(data);
    }
}

const modifiyGameState = (data) => {

    if (data != null) {
        // pour les textes de base -> null besoin de faire des append child -> on peut injecter directement notre data avec innerHtml
        document.querySelector(".error-message").innerHTML = "";
        document.querySelector("#name-ennemy").innerHTML = data["opponent"]["username"];
        document.querySelector("#nb-health").innerHTML = data["opponent"]["hp"];
        document.querySelector("#nb-mp").innerHTML = data["opponent"]["mp"];
        document.querySelector("#nb-cartes-text").innerHTML = data["opponent"]["remainingCardsCount"];

        // mes donnees 
        document.querySelector("#nb-healthMe").innerHTML = data["hp"];
        document.querySelector("#nb-mpMe").innerHTML = data["mp"];
        document.querySelector("#nb-cartes-textMe").innerHTML = data["remainingCardsCount"];
    }
}

const changeStatePlay = (data) => {
    if (data != null) {
        if (typeof data !== "object") {
            if (data == "INVALID_KEY") {
                document.querySelector(".error-message").innerHTML = "INVALID_KEY";
            } else if (data == "INVALID_ACTION") {

            } else if (data == "ACTION_IS_NOT_AN_OBJECT") {

            } else if (data == "NOT_ENOUGH_ENERGY") {

            } else if (data == "BOARD_IS_FULL") {

            } else if (data == "CARD_NOT_IN_HAND") {

            } else if (data == "CARD_IS_SLEEPING") {

            } else if (data == "MUST_ATTACK_TAUNT_FIRST") {

            } else if (data == "OPPONENT_CARD_NOT_FOUND") {

            } else if (data == "OPPONENT_CARD_HAS_STEALTH") {

            } else if (data == "CARD_NOT_FOUND") {

            } else if (data == "ERROR_PROCESSING_ACTION") {

            } else if (data == "INTERNAL_ACTION_ERROR") {

            } else if (data == "HERO_POWER_ALREADY_USED") {

            }
        }
    }
}