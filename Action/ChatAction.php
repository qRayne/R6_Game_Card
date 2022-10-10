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
            $key = file_get_contents("data/key.txt"); // je recupère la ligne au complet (une seule ligne sur le fichier)
            return compact("key");
        }
    }