<!DOCTYPE html>
<html lang="fr">

<?php
require_once("action/LoginAction.php");

$action = new LoginAction();
$data = $action->execute();
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/loginBackground.js"></script>
    <title>Login</title>
    <link rel="stylesheet" href="Css/global.css">
    <link rel="stylesheet" href="Css/index.css">
</head>

<body class="background">
    <img id="flameLeftEye" src="images/flame.gif" alt="">
    <img id="flameRightEye" src="images/flame.gif" alt="">
    <div class="form-style-6">
        <form class="loginForm" action="" method="post">
            <?php
            if (!empty($data["message"])) {
            ?>
                <div class="error-message"><?= $data["message"] ?></div>
            <?php
            }
            ?>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" name="button" value="Register" />
        </form>
    </div>

</body>

</html>