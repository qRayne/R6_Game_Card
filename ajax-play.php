<?php
    require_once("Action/AjaxPlayAction.php");

    $action = new AjaxPlayAction();
    $data = $action->execute();

    echo json_encode($data["action"]);