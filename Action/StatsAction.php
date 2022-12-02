<?php
require_once("action/CommonAction.php");
require_once("DAO/StatsDAO.php");


class StatsAction extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        if (isset($_POST["delete"])){
            StatsDAO::deleteContent();
            header("location:chat.php");
            exit;
        }
        $countCartes = StatsDAO::getCountCartes();
        $countTotal = StatsDAO::getCountAllCartes();
        return compact("countCartes","countTotal");
    }
}
