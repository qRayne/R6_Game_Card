<!DOCTYPE html>
<html lang="fr">

<?php
require_once("action/ChatAction.php");

$action = new ChatAction();
$data = $action->execute();
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/loginBackground.js"></script>
    <title>Chat</title>
    <link rel="stylesheet" href="Css/global.css">
    <link rel="stylesheet" href="Css/chat.css">
    <script src="js/chatStyle.js"></script>
</head>

<body class="staticBackground">
    <div class="form-style-4">
        <form action="chat.php" method="POST">
            <input type="submit" name="btnPlay" value="PLAY">
            <input type="submit" name="btnTraining" value="TRAINING">
            <input type="submit" name="btnDeck" value="DECK">
            <input type="submit" name="btnStats" value="STATS">
            <input type="submit" name="btnQuit" value="QUIT">
        </form>
    </div>
    <div class="iframe">
        <center><iframe style="width:700px;height:275px;margin-top:10%;border:2px solid #40E0D0;" onload="applyStyles(this)" <?= $data["urlwithKey"] ?> </iframe></center>
    </div>
</body>

</html>