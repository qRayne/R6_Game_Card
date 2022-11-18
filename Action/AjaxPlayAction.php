<?php
    require_once("action/CommonAction.php");

    class AjaxPlayAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["keyOnly"];
            $data["type"] = $_POST["type"];

            $action = CommonAction::callApi("games/action", $data);
            return compact("action");
        }
    }