<?php
    require_once("Action/AjaxStateAction.php");

    $action = new AjaxStateAction();
    $data = $action->execute();

    echo json_encode($data["result"]);