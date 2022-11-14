<?php
    require_once("Action/PlayAction.php");

    $action = new PlayAction();
    $data = $action->execute();

    echo json_encode($data["result"]);