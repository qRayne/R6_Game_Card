<?php
    require_once("Action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $resultDataCall = $_SESSION["json"];
            return compact("resultDataCall");
        }
    }