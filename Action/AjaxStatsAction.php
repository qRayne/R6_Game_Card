<?php
    require_once("action/CommonAction.php");
    require_once("DAO/StatsDAO.php");


    class AjaxStatsAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["id"] = $_POST["id"];

            StatsDAO::addCarte($data["id"]);
        }
    }