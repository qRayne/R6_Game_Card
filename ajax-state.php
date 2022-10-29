<?php
    require_once("Action/AjaxAction.php");

    $action = new AjaxAction();
    $data = $action->execute();

    echo json_encode($data["resultDataCall"]);