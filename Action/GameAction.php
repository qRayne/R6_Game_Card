<?php
    require_once("action/CommonAction.php");

    class GameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["keyOnly"];
            $output = "";

            $result = CommonAction::callApi("games/state",$data);

            if ($result == "WAITING"){
                $output = "WAITING";
            }
            else if ($result == "LAST_GAME_WON"){
                $output = "LAST_GAME_WON";
            }
            else if ($result == "LAST_GAME_LOST"){
                $output = "LAST_GAME_LOST";

            }
            else if ($result == "INVALID_KEY"){
                $output = "INVALID_KEY";
            }
            else{
                // un document json sera retournee
                // On fera les manipulations avec le json
                $output = $result;
            }

            return compact("output");
        }
    }