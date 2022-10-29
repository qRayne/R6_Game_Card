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
    <script src="js/game.js"></script>
    <title>Game</title>
</head>

<body class="staticBackground">
    <?php
    if (!empty($data["message"])) {
    ?>
        <div class="error-message"><?= $data["message"] ?></div>
    <?php
    }
    ?>

    <div class="box-layout-ennemie">
        <img src="images/back-card.jpg" alt="r6-card">
        <img src="images/back-card.jpg" alt="r6-card">
        <img src="images/back-card.jpg" alt="r6-card">
        <img src="images/back-card.jpg" alt="r6-card">
        <img src="images/back-card.jpg" alt="r6-card">

    </div>

    <div class="box-layout-carte-ennemie">

    </div>

    <div class="box-layout-carte-joueur">

    </div>

    <div class="box-layout-joueur">

    </div>
</body>

</html>