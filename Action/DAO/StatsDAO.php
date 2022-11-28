<?php

    require_once("action/DAO/Connection.php");
    
    class StatsDAO{

        public static function getCartes(){ 
            // $connection = Connection::getConnection();

            // $statement = $connection->prepare("SELECT * FROM stack_answers");
            // $statement->setFetchMode(PDO::FETCH_ASSOC);
            // $statement->execute();

            // $result = $statement->fetchAll();

            // return $result;
        }

        public static function addCarte(){
            // $connection = Connection::getConnection();

            // $statement = $connection->prepare("INSERT INTO stack_answers (author,answer) VALUES (?,?)"); // on insert dans la tables les valeurs qu'on passe en paramètre
            // $statement->bindParam(1,$author);
            // $statement->bindParam(2,$answer);
            // $statement->execute();
        }
        
    }