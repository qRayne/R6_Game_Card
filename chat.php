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
    <script src="js/chatStyle.js"></script>
</head>

<body class="background" style="background-image: url('images/background_chat.jpg'); background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">
    <center><iframe style="width:700px;height:275px;margin-top:30%;border:2px solid #40E0D0;" onload="applyStyles(this)" <?= $data["key"] ?> </iframe></center>
    <input style="margin:10px;"type="submit" name="buttonPlay" value="PLAY"/>
    <input type="submit" name="buttonQuit" value="QUIT"/>
</body>

</html>