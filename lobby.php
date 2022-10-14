<!DOCTYPE html>
<html lang="en">

<?php
require_once("action/LobbyAction.php");

$action = new LobbyAction();
$data = $action->execute();
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="styleshset" href="Css/global.css">
    <link rel="stylesheet" href="Css/lobby.css">
    <title>Lobby</title>
</head>

<body class="staticBackground">
    <?php
    if (!empty($data["message"])){
        ?>
        <div class="error-message"><?= $data["message"] ?></div>
        <?php
    }
    ?>
    <div class="form-style-5">
        <form action="chat.php" method="POST">
            <input type="submit" name="btnPVP" value="PVP">
            <input type="submit" name="btnTraining" value="TRAINING">
        </form>
    </div>
</body>

</html>