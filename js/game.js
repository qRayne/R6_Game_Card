import Cartes from "./Cartes.js";

let dataGame = null;
let errorData = null;

const state = () => {
    fetch("ajax-game.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {
            checkGameState(data);
            dataGame = data;
            console.log(dataGame);
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}

// Pour l'action de end_turn, surrender et hero_power
const statePlay = (action, uid, targetuid) => {
    let data = new FormData();

    if (action == "END_TURN" || action == "SURRENDER" || action == "HERO_POWER") {
        data.append("type", action);
    } else if (action == "PLAY") {
        data.append("type", action);
        data.append("uid", uid);
    } else if (action == "ATTACK") {
        data.append("type", action);
        data.append("uid", uid);
        data.append("targetuid", targetuid);
    }


    fetch("ajax-play.php", {
            method: "post",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            errorData = data;
        })
};

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

        //mes donnees
        // document.querySelector("#nb-healthMe").innerHTML = data["hp"];
        // document.querySelector("#nb-mpMe").innerHTML = data["mp"];
        // document.querySelector("#nb-cartes-textMe").innerHTML = data["remainingCardsCount"];

        // pour les cartes que j'ai dans les mains
        while (document.querySelector(".box-layout-joueur").firstChild) {
            document.querySelector(".box-layout-joueur").removeChild(document.querySelector(".box-layout-joueur").lastChild);
        }

        while (document.querySelector(".box-layout-carte-joueur").firstChild) {
            document.querySelector(".box-layout-carte-joueur").removeChild(document.querySelector(".box-layout-carte-joueur").lastChild);
        }

        while (document.querySelector(".box-layout-carte-ennemie").firstChild) {
            document.querySelector(".box-layout-carte-ennemie").removeChild(document.querySelector(".box-layout-carte-ennemie").lastChild);
        }

        data["hand"].forEach(element => {
            Cartes.createElement(".box-layout-joueur", element, element["uid"]);
        })

        data["board"].forEach(element => {
            Cartes.createElement(".box-layout-carte-joueur", element, element["uid"]);
        })

        data["opponent"]["board"].forEach(element => {
            Cartes.createElement(".box-layout-carte-ennemie", element, element["uid"]);
        })
    }
}

const putCardInBoard = (uid) => {
    if (typeof uid == "number") {
        if (dataGame["yourTurn"] == true) {
            dataGame["hand"].forEach(element => {
                if (element["uid"] == uid) {
                    statePlay("PLAY", uid, '');
                    Cartes.createElement(".box-layout-carte-joueur", element, uid);
                    errorsHandlers(errorData, "Playing a card");
                }
            });
        }
    }
}

const attackCard = (uid, targetuid) => {
    if (typeof uid == "number") {
        if (dataGame["yourTurn"] == true) {
            dataGame["opponent"]["board"].forEach(element => {
                if (element["uid"] == targetuid) {
                    dataGame["board"].forEach(element => {
                        if (element["uid"] == uid) {
                            statePlay("ATTACK", uid, targetuid);
                            errorsHandlers(errorData, "Attacking a card");
                        }
                    });
                }
            });
        }
    }
}
const errorsHandlers = (data, action) => {
    if (data != null) {
        if (typeof data !== "object") {
            if (data == "INVALID_KEY") {
                document.querySelector(".error-message").innerHTML = "INVALID_KEY";
            } else if (data == "INVALID_ACTION") {
                document.querySelector(".error-message").innerHTML = "INVALID_ACTION";
            } else if (data == "ACTION_IS_NOT_AN_OBJECT") {
                document.querySelector(".error-message").innerHTML = "ACTION_IS_NOT_AN_OBJECT";
            } else if (data == "NOT_ENOUGH_ENERGY") {
                document.querySelector(".error-message").innerHTML = "NOT_ENOUGH_ENERGY";
            } else if (data == "BOARD_IS_FULL") {
                document.querySelector(".error-message").innerHTML = "BOARD_IS_FULL";
            } else if (data == "CARD_NOT_IN_HAND") {
                document.querySelector(".error-message").innerHTML = "CARD_NOT_IN_HAND";
            } else if (data == "CARD_IS_SLEEPING") {
                document.querySelector(".error-message").innerHTML = "CARD_IS_SLEEPING";
            } else if (data == "MUST_ATTACK_TAUNT_FIRST") {
                document.querySelector(".error-message").innerHTML = "MUST_ATTACK_TAUNT_FIRST";
            } else if (data == "OPPONENT_CARD_NOT_FOUND") {
                document.querySelector(".error-message").innerHTML = "OPPONENT_CARD_NOT_FOUND";
            } else if (data == "OPPONENT_CARD_HAS_STEALTH") {
                document.querySelector(".error-message").innerHTML = "OPPONENT_CARD_HAS_STEALTH";
            } else if (data == "CARD_NOT_FOUND") {
                document.querySelector(".error-message").innerHTML = "CARD_NOT_FOUND";
            } else if (data == "ERROR_PROCESSING_ACTION") {
                document.querySelector(".error-message").innerHTML = "ERROR_PROCESSING_ACTION";
            } else if (data == "INTERNAL_ACTION_ERROR") {
                document.querySelector(".error-message").innerHTML = "INTERNAL_ACTION_ERROR";
            } else if (data == "HERO_POWER_ALREADY_USED") {
                document.querySelector(".error-message").innerHTML = "HERO_POWER_ALREADY_USED";
            }
        } else {
            document.querySelector(".error-message").innerHTML = "Ur " + action;
        }
    }
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    document.querySelector(".box-layout-joueur").addEventListener('click', (e) => {
        putCardInBoard(parseInt(e.target.id));
    });
    // document.querySelector("#endturn").addEventListener('click', () => {
    //     statePlay("END_TURN");
    // });
    // document.querySelector("#surrender").addEventListener('click', () => {
    //     statePlay("SURRENDER");
    // });

    document.querySelector(".box-layout-carte-joueur").addEventListener('click', (e) => {
        let uid = e.target.id;
        document.querySelector(".box-layout-carte-ennemie").addEventListener('click', (e) => {
            let targeUid = e.target.id;
            attackCard(parseInt(uid), parseInt(targeUid));
        })
    })

});