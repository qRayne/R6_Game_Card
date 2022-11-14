<?php
    require_once("Action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

    echo json_encode($data["result"]);