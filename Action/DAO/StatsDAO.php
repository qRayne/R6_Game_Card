<?php

    require_once("action/DAO/Connection.php");
    
    class StatsDAO{

        public static function getCountCartes(){ 
           $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT id_carte, COUNT(*) FROM cartes GROUP BY id_carte;");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $result = $statement->fetchAll();

            return $result;
        }

        public static function getCountAllCartes(){

            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT COUNT(*) FROM cartes");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $result = $statement->fetchAll();

            return $result;
        }

        public static function addCarte($idCarte){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO cartes (id_carte) VALUES (?)"); // on insert dans la tables les valeurs qu'on passe en paramètre
            $statement->bindParam(1,$idCarte);
            $statement->execute();
        }
        
        public static function deleteContent(){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("DELETE FROM cartes");
            $statement->execute();
        }
    }