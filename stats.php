<!DOCTYPE html>
<html lang="fr">

<?php
require_once("action/StatsAction.php");

$action = new StatsAction();
$data = $action->execute();
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stats</title>
    <link rel="stylesheet" href="Css/global.css">
</head>

<body class="staticBackground" style="color:white">
    <?php
        if (!empty($data["countCartes"])){
            foreach ($data["countCartes"] as $key => $value) {
                ?>
                <div><?= $value["id_carte"] ?></div>
                <?php
                foreach ($data["countTotal"] as $key => $value2 ) {
                }
                ?>
                <div><?=($value["count"] / $value2["count"]) * 100 ?></div>
                <?php
            }
        }
    ?>
    
</body>
</html>