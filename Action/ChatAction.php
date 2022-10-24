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
            $data = [];
            $data["key"] = $_SESSION["keyOnly"];

            if(isset($_POST["btnPlay"])){
                $data["type"] = "PVP";
                $result = CommonAction::callApi("games/auto-match",$data);

                if ($result == "JOINED_PVP" || $result == "CREATED_PVP"){
                    header("location:game.php"); // si l'utilisateur click sur play
                    exit;
                }
                else {
                    if ($result == "INVALID_KEY"){
                        $message = "UR KEY IS INVALID";
                        return compact("message");
                    }
                    else if ($result == "INVALID_GAME_TYPE"){
                        $message = "THE GAME TYPE CHOSEN IS INVALID";
                        return compact("message");
                    }
                    else if ($result == "DECK_INCOMPLETE"){
                        $message = "UR DECK IS NOT COMPLETE";
                        return compact("message");
                    }
                }
            }
            else if (isset($_POST["btnTraining"])){

                $data["type"] = "TRAINING";
                $result = CommonAction::callApi("games/auto-match",$data);

                if ($result == "JOINED_TRAINING"){
                    header("location:training.php"); // si l'utilisateur click sur play
                    exit;
                }
                else {
                    if ($result == "INVALID_KEY"){
                        $message = "UR KEY IS INVALID";
                        return compact("message");
                    }
                    else if ($result == "INVALID_GAME_TYPE"){
                        $message = "THE GAME TYPE CHOSEN IS INVALID";
                        return compact("message");
                    }
                    else if ($result == "DECK_INCOMPLETE"){
                        $message = "UR DECK IS NOT COMPLETE";
                        return compact("message");
                    }
                }
            }
            else if (isset($_POST["btnQuit"])){
                // L'utilisateur souhaite se deconnecter
                $result = CommonAction::callApi("signout",$data);

                if ($result == "INVALID_KEY"){
                    $message = "U ARE NOT CONNECTED";
                    return compact ("message");
                }
                else{
                    header("location:index.php");
                    exit;
                }
            }

            // retourne la clee avec l'url.
            $urlwithKey = $_SESSION["urlwithKey"];
            return compact("urlwithKey");
        }
    }