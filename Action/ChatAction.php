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
                header("location:game.php"); // si l'utilisateur click sur play
                exit;
            }
            else if (isset($_POST["btnDeck"])){
                header("location:deck.php");
                exit;
            }
            else if (isset($_POST["btnQuit"])){
                header("location:login.php");
                exit;
            }

            // retourne la clee avec l'url.
            $urlwithKey = $_SESSION["urlwithKey"];
            return compact("urlwithKey");
        }
    }