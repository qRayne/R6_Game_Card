<!DOCTYPE html>
<html lang="en">

<?php
    require_once("action/DeckAction.php");

    $action = new DeckAction();
    $data = $action->execute();

?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Css/global.css">
    <title>Deck</title>
</head>

<body class="staticBackground">
    <iframe class="iframeDeck"<?php
        if (!empty($data["src"])){
            ?>
            <?= $data["src"] ?>
            <?php
        }
    ?>>
    </iframe>
</body>

</html>