<?php
    require_once("action/CommonAction.php");

    class PlayAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["keyOnly"];
            $data["type"] = "HERO_POWER";
            $result = CommonAction::callApi("games/state",$data);
            return compact("result");
        }
    }