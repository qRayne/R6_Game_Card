import Cartes from "./Cartes.js";

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
            surrender.addEventListener('click', () => {
                statePlay("SURRENDER");
            });

            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}

// Pour l'action de end_turn, surrender et hero_power
const statePlay = (e) => {
    let data = new FormData();

    data.append("type", e);

    fetch("ajax-play.php", {
            method: "post",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            errorsHandlers(data);
        })
};

// pour play
const play = (e, uid) => {
    let data = new FormData();

    data.append("type", e);
    data.append("uid", uid);

    fetch("ajax-play.php", {
            method: "post",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            errorsHandlers(data);
        })
}

// pour attaquer
const attack = (e, uid, targetuid) => {
    let data = new FormData();

    data.append("type", e);
    data.append("uid", uid);
    data.append("targetuid", uid);


    fetch("ajax-play.php", {
            method: "post",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            errorsHandlers(data);
        })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
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
    let nbCartesHandMe = [];
    let nbCartesBoardOpponent = [];

    if (data != null) {
        // pour les textes de base -> null besoin de faire des append child -> on peut injecter directement notre data avec innerHtml
        document.querySelector(".error-message").innerHTML = "";
        document.querySelector("#name-ennemy").innerHTML = data["opponent"]["username"];
        document.querySelector("#nb-health").innerHTML = data["opponent"]["hp"];
        document.querySelector("#nb-mp").innerHTML = data["opponent"]["mp"];
        document.querySelector("#nb-cartes-text").innerHTML = data["opponent"]["remainingCardsCount"];

        // pour les cartes de l'ennemie
        data["opponent"]["board"].forEach(element => {
            let cartes = new Cartes(element["id"], element["cost"], element["hp"],
                element["atk"], element["mechanics"], element["uid"], element["baseHp"]);
            nbCartesBoardOpponent.push(cartes);
        });

        //mes donnees
        document.querySelector("#nb-healthMe").innerHTML = data["hp"];
        document.querySelector("#nb-mpMe").innerHTML = data["mp"];
        document.querySelector("#nb-cartes-textMe").innerHTML = data["remainingCardsCount"];

        // pour les cartes que j'ai dans les mains
        data["hand"].forEach(element => {
            let cartes = new Cartes(element["id"], element["cost"], element["hp"],
                element["atk"], element["mechanics"], element["uid"], element["baseHp"]);
            nbCartesHandMe.push(cartes);
            console.log(cartes.id);
        })
    }

    //play("PLAY", 79);
}

const errorsHandlers = (data) => {
    if (data != null) {
        if (typeof data !== "object") {
            if (data == "INVALID_KEY")
                document.querySelector(".error-message").innerHTML = "INVALID_KEY";
            else if (data == "INVALID_ACTION")
                document.querySelector(".error-message").innerHTML = "INVALID_ACTION";
            else if (data == "ACTION_IS_NOT_AN_OBJECT")
                document.querySelector(".error-message").innerHTML = "ACTION_IS_NOT_AN_OBJECT";
            else if (data == "NOT_ENOUGH_ENERGY")
                document.querySelector(".error-message").innerHTML = "NOT_ENOUGH_ENERGY";
            else if (data == "BOARD_IS_FULL")
                document.querySelector(".error-message").innerHTML = "BOARD_IS_FULL";
            else if (data == "CARD_NOT_IN_HAND")
                document.querySelector(".error-message").innerHTML = "CARD_NOT_IN_HAND";
            else if (data == "CARD_IS_SLEEPING")
                document.querySelector(".error-message").innerHTML = "CARD_IS_SLEEPING";
            else if (data == "MUST_ATTACK_TAUNT_FIRST")
                document.querySelector(".error-message").innerHTML = "MUST_ATTACK_TAUNT_FIRST";
            else if (data == "OPPONENT_CARD_NOT_FOUND")
                document.querySelector(".error-message").innerHTML = "OPPONENT_CARD_NOT_FOUND";
            else if (data == "OPPONENT_CARD_HAS_STEALTH")
                document.querySelector(".error-message").innerHTML = "OPPONENT_CARD_HAS_STEALTH";
            else if (data == "CARD_NOT_FOUND")
                document.querySelector(".error-message").innerHTML = "CARD_NOT_FOUND";
            else if (data == "ERROR_PROCESSING_ACTION")
                document.querySelector(".error-message").innerHTML = "ERROR_PROCESSING_ACTION";
            else if (data == "INTERNAL_ACTION_ERROR")
                document.querySelector(".error-message").innerHTML = "INTERNAL_ACTION_ERROR";
            else if (data == "HERO_POWER_ALREADY_USED")
                document.querySelector(".error-message").innerHTML = "HERO_POWER_ALREADY_USED";
        }
    }
}