import Cartes from "./Cartes.js";

let dataGame = null;
let booleanError = false;

const state = () => {
    fetch("ajax-game.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {
            checkGameState(data);
            dataGame = data;
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}

// Pour l'action de end_turn, surrender et hero_power
const statePlay = (action, uid, targetuid) => {
    let data = new FormData();

    if (action == "END_TURN" || action == "SURRENDER" || action == "HERO_POWER") {
        data.append("type", action);
        data.append("uid", '');
        data.append("targetuid", '');
    } else if (action == "PLAY") {
        data.append("type", action);
        data.append("uid", uid);
        data.append("targetuid", '');
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
            if (data != null) {
                if (typeof data !== "object") {
                    document.querySelector(".error-message").innerHTML = data;
                    booleanError = true;
                }
            }
        })
};

const addCardsDatabase = (id) => {
    let data = new FormData();

    data.append("id", id);

    fetch("ajax-stats.php", {
        method: "post",
        body: data
    });
}

const checkGameState = (data) => {

    if (data != null) {
        if (data == "WAITING")
            document.querySelector(".error-message").innerHTML = "WAITING";
        else if (data == "LAST_GAME_WON")
            endingGame("LAST_GAME_WON")
        else if (data == "LAST_GAME_LOST")
            endingGame("LAST_GAME_LOST")
        else
            modifiyGameState(data);
    }
}


// il faut attaquer aussi le perso en cliquant sur le logo image
const modifiyGameState = (data) => {

    if (data != null) {
        // pour les textes de base -> null besoin de faire des append child -> on peut injecter directement notre data avec innerHtml
        document.querySelector(".error-message").innerHTML = "";
        document.querySelector("#name-ennemy").innerHTML = data["opponent"]["username"];
        document.querySelector("#ennemy-description").innerHTML = data["opponent"]["welcomeText"];
        document.querySelector("#nb-health").innerHTML = data["opponent"]["hp"];
        document.querySelector("#nb-mp").innerHTML = data["opponent"]["mp"];
        document.querySelector("#nb-cartes-text").innerHTML = data["opponent"]["remainingCardsCount"];

        //mes donnees
        document.querySelector("#nb-healthMe").innerHTML = data["hp"];
        document.querySelector("#nb-mpMe").innerHTML = data["mp"];
        document.querySelector("#nb-cartes-textMe").innerHTML = data["remainingCardsCount"];
        document.querySelector("#time").innerHTML = "Time left : " + data["remainingTurnTime"];
        document.querySelector("#turn").innerHTML = "your turn : " + data["yourTurn"];


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
            Cartes.createElement(".box-layout-joueur", element, element["uid"], element["state"]);
        })

        data["board"].forEach(element => {
            Cartes.createElement(".box-layout-carte-joueur", element, element["uid"], element["state"]);
        })

        data["opponent"]["board"].forEach(element => {
            Cartes.createElement(".box-layout-carte-ennemie", element, element["uid"], element["state"]);
        })
    }
}

const endingGame = (result) => {
    if (result == "LAST_GAME_WON")
        document.querySelector(".error-message").innerHTML = "U WON THE GAME";
    else if (result == "LAST_GAME_LOST")
        document.querySelector(".error-message").innerHTML = "U LOST THE GAME";

    setTimeout(function() { location.href = "chat.php" }, 4000);
}

const putCardInBoard = (uid) => {
    if (typeof uid == "number") {
        if (dataGame["yourTurn"] == true) {
            dataGame["hand"].forEach(element => {
                if (element["uid"] == uid) {
                    statePlay("PLAY", uid, '');
                    if (booleanError != true) {
                        Cartes.createElement(".box-layout-carte-joueur", element, uid, element["state"]);
                        addCardsDatabase(element["id"]);
                        booleanError = false;
                    }
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
                        }
                    });
                }
            });
        }
    }
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    document.querySelector(".box-layout-joueur").addEventListener('click', (e) => {
        putCardInBoard(parseInt(e.target.id));
    });

    document.querySelector("#endturn").addEventListener('click', () => {
        statePlay("END_TURN");
    });

    document.querySelector("#surrender").addEventListener('click', () => {
        statePlay("SURRENDER");
    });

    document.querySelector("#heropower").addEventListener('click', () => {
        statePlay("HERO_POWER");
    });

    document.querySelector(".box-layout-carte-joueur").addEventListener('click', (e) => {
        let uid = e.target.id;
        document.querySelector(".box-layout-carte-ennemie").addEventListener('click', (e) => {
            let targeUid = e.target.id;
            attackCard(parseInt(uid), parseInt(targeUid));
        })
        document.querySelector("#recruit-logo").addEventListener('click', () => {
            statePlay("ATTACK", parseInt(uid), 0);
        })
    })

});