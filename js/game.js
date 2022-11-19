import Cartes from "./Cartes.js";

const state = () => {
    fetch("ajax-game.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {
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

const statePlay = (e) => {
    let data = new FormData();

    data.append("type", e);

    fetch("ajax-play.php", {
            method: "post",
            body: data
        })
        .then(response => response.json())
        .then(data => {

        })
};

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

// function loadImages(sources, callback) {
//     var images = {};
//     var loadedImages = 0;
//     var numImages = 0;
//     // get num of sources
//     for (var src in sources) {
//         numImages++;
//     }
//     for (var src in sources) {
//         images[src] = new Image();
//         images[src].onload = function() {
//             if (++loadedImages >= numImages) {
//                 callback(images);
//             }
//         };
//         images[src].src = sources[src];
//     }
// }
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');

// var sources = {
//     image1: "images/front-card.jpg"
// };

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
            console.log("le nombre de cartes dans le board de l'ennemie " + nbCartesBoardOpponent.length);
        });

        // mes donnees 
        // document.querySelector("#nb-healthMe").innerHTML = data["hp"];
        // document.querySelector("#nb-mpMe").innerHTML = data["mp"];
        // document.querySelector("#nb-cartes-textMe").innerHTML = data["remainingCardsCount"];

        // pour les cartes que j'ai dans les mains
        data["hand"].forEach(element => {
            let cartes = new Cartes(element["id"], element["cost"], element["hp"],
                element["atk"], element["mechanics"], element["uid"], element["baseHp"]);
            nbCartesHandMe.push(cartes);
            console.log("le nombre de cartes que j'ai dans les mains " + nbCartesHandMe.length);
        })

        // loadImages(sources, function(images) {
        //     context.drawImage(images.image1, 50, 0);
        //     context.drawImage(images.image1, 300, 0);
        // });

        // let image = document.createElement("img");
        // let src = document.querySelector(".box-layout-joueur");;
        // image.src = "images/front-card.jpg";
        // image.width = "300";
        // image.height = "300";
        // src.appendChild(image.cloneNode(true));

        // let x = 0;
        // data["hand"].forEach(element => {
        //     let circle_canvas = document.getElementById("canvas");
        //     let context = circle_canvas.getContext("2d");

        //     // Draw Image function
        //     let img = new Image();
        //     img.src = "images/front-card.jpg";
        //     img.id = element.id;
        //     img.onload = function() {
        //         context.drawImage(img, x, 0);
        //         context.fillStyle = "#05807b";
        //         context.font = "18px sans-serif";
        //         context.fillText(element["cost"], 40, 319);
        //         context.fillText(element["hp"], 103, 319);
        //         context.fillText(element["atk"], 166, 319);
        //     };

        //     console.log(element.id);
        // })

    }
}