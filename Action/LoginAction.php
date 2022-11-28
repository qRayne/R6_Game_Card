<?php
require_once("action/CommonAction.php");

class LoginAction extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        if (isset($_POST["username"]) && isset($_POST["password"])){
            $data = [];
            $data["username"] = $_POST["username"];
            $data["password"] = $_POST["password"];
            $result = CommonAction::callAPI("signin", $data);

            if ($result == "INVALID_USERNAME_PASSWORD") {
                // err
                $message = "FAILED AUTHENTIFICATION";
                return compact("message");
            }
            else {
                // Pour voir les informations retournées : var_dump($result);exit;
                $key = $result->key;
                $sentence = "src=https://magix.apps-de-cours.com/server/#/chat/" . "$key";
                $_SESSION["urlwithKey"] = $sentence; // on met le src dans une variable de session
                $_SESSION["keyOnly"] = $key; // on met uniquement la clee
                header("location:chat.php");
                exit;
            }
        }
    }
}
