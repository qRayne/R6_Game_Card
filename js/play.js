import { Cartes } from './Cartes.js';
const state = () => {
    fetch("ajax-game.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST" // l’API (games/state)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //checkGameState(data);
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}
window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});