<?php
require_once("action/CommonAction.php");

class DeckAction extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $key = $_SESSION["keyOnly"];
        $src = "src = https://magix.apps-de-cours.com/server/#/deck/" . $key;
        return compact("src");
    }
}
