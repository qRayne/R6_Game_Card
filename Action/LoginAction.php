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
        // $data = [];
        // $data["username"] = "Rayane";
        // $data["password"] = "Ry09112002";

        if (!empty($_POST["username"]) && !empty($_POST["password"])){
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
                file_put_contents("data/key.txt",""); // vide le fichier
                file_put_contents("data/key.txt",$sentence,FILE_APPEND); // ajoute la dernière clee generer
                header("location:chat.php");
                exit;
            }
        }
    }
}
