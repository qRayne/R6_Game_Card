<?php
require_once("action/GameAction.php");

$action = new GameAction();
$data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Css/global.css">
    <link rel="stylesheet" href="Css/game.css">
    <script type="module" src="js/game.js"></script>
    <title>Game</title>
</head>

<body class="staticBackground">

    <div class="error-message">
    </div>

    <div class="box-layout-ennemie">
        <img src="images/back-card-initial.jpg" alt="r6-card">
        <img src="images/back-card-initial.jpg" alt="r6-card">
        <img src="images/back-card-initial.jpg" alt="r6-card">
        <img src="images/back-card-initial.jpg" alt="r6-card">
        <img src="images/back-card-initial.jpg" alt="r6-card">
        <img id="health-logo" src="images/health.jpg" alt="health-logo">
        <p id="nb-health"></p>
        <img id="recruit-logo" src="images/logo.png" alt="default image">
        <!-- <p id="name-ennemy"></p> -->
        <img id="mp-logo" src="images/health.jpg" alt="mp-image">
        <p id="nb-mp"></p>
        <img id="nb-cartes" src="images/back-card-initial.jpg" alt="r6-nbCards">
        <p id="nb-cartes-text"></p>
    </div>

    <div class="box-layout-carte-ennemie" method="post">

    </div>

    <div class="box-layout-carte-joueur" method="post">

    </div>

    <div class="box-layout-joueur" method="post">
    </div>

    <div class="details-game">
        <p id="nb-healthMe"></p>
        <img id="health-logoMe" src="images/health.jpg" alt="mp-image"><br>
        <p id="nb-mpMe"></p>
        <img id="mp-logoMe" src="images/health.jpg" alt="mp-image"><br>
        <p id="nb-cartes-textMe"></p>
        <img id="nb-cartesMe" src="images/back-card-initial.jpg" alt="r6-nbCards">
    </div>

    <div class="buttonendturn">
        <button id="endturn" name="endturn" >END TURN </button> <br>
        <button id="surrender" name="surrender">SURRENDER</button> <br>
        <button id="heropower" name="heropower">HERO POWER</button>
    </div>

    <div class="infoGame">
        <p id="time"></p>
        <p id="turn"></p>
    </div>

</body>

</html>