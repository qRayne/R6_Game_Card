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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

    <canvas id="pie-chart"></canvas>
        <script>
            const data = {
                labels: ['Simple', 'Double', 'Suite'],
                datasets: [{
                    label: 'Types de chambre',
                    data: [50, 50, 100],
                    color: "#fff",
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                }]
            };

            const config = {
                type: 'pie',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    }
                }
            };

            new Chart(document.getElementById('pie-chart'), config);

            </script>
    
</body>
</html>