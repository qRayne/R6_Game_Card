<?php
    require_once("action/CommonAction.php");

    class GameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["keyOnly"];

            $result = CommonAction::callApi("games/state",$data);

            if ($result == "WAITING"){
                $message = "UR WAITING FOR SOMEONE";
                return compact("message");
            }
            else if ($result == "LAST_GAME_WON"){
                $message = "U WON THE LAST GAME";
                return compact("message");
            }
            else if ($result == "LAST_GAME_LOST"){
                $message = "U LOST THE LAST GAME";
                return compact("message");
            }
            else if ($result == "INVALID_KEY"){
                $message = "UR KEY IS INVALID";
                return compact("message");
            }
            else{
                // un document json sera retournee
                // On fera les manipulations avec le json
                $message = "Un json est entrain d'être retournee";
                $_SESSION["json"] = $result;
                return compact("message");
            }

        }
    }