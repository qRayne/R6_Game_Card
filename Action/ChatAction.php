<?php
    require_once("action/CommonAction.php");

    class ChatAction extends CommonAction
    {
    
        public function __construct()
        {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }
    
        protected function executeAction()
        {
            if(isset($_POST["btnPlay"])){
                header("location:lobby.php"); // si l'utilisateur click sur play
                exit;
            }
            else if (isset($_POST["btnDeck"])){
                header("location:deck.php");
                exit;
            }
            else if (isset($_POST["btnQuit"])){
                // L'utilisateur souhaite se deconnecter
                $data = [];
                $data["key"] = $_SESSION["keyOnly"];
                $result = CommonAction::callApi("signout",$data);

                if ($result == "INVALID_KEY"){
                    $message = "U ARE NOT CONNECTED";
                    return compact ("message");
                }
                else{
                    header("location:login.php");
                    exit;
                }

            }

            // retourne la clee avec l'url.
            $urlwithKey = $_SESSION["urlwithKey"];
            return compact("urlwithKey");
        }
    }