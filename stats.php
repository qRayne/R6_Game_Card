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
    <link rel="stylesheet" href="Css/stats.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body class="staticBackground2">
    <form action="" method="POST">
        <input id="deleteButton" type="submit" name="delete" value="CLEAR">

    <div class="stats">
        <?php
        if (!empty($data["countCartes"])) {
            foreach ($data["countCartes"] as $key => $value) {
        ?>
                <div>la carte avec le id : <?= $value["id_carte"] ?></div>
                <?php
                foreach ($data["countTotal"] as $key => $value2) {
                }
                ?>
                <div><?= round(($value["count"] / $value2["count"]) * 100,2) ?> % </div>
        <?php
            }
        }
            ?>
            <div> le nombre total de cartes jouées : <?= $data["countTotal"][0]["count"]?></div>
    </div>
</body>

</html>