<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["keyOnly"];
            
            // Savoir quel button le joueur veut selectionner
            if(isset($_POST["btnPVP"])){
                $data["type"] = "PVP";
            }
            else if (isset($_POST["btnTraining"])){
                $data["type"] = "TRAINING";
            }

            // connection à l'api
            $result = CommonAction::callApi("games/auto-match",$data);
            
        
            // Interaction avec l'api
            if ($result == "JOINED_PVP"){
                header("location:game.php");
                exit;
            }
            else if ($result == "JOINED_TRAINING"){
                header("location:training.php");
                exit;
            }
            else {
                if ($result == "INVALID_KEY"){
                    $message = "UR KEY IS INVALID";
                    return compact("message");
                }
                else if ($result == "INVALID_GAME_TYPE"){
                    $message = "THE GAME TYPE CHOOSEN IS INVALID";
                    return compact("message");
                }
                else if ($result == "DECK_INCOMPLETE"){
                    $message = "UR DECK IS NOT COMPLETE";
                    return compact("message");
                }
            }
        }
    }