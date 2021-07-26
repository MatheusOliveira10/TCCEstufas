<?php

namespace Models;

use PDO;
use Models\Helper;

class Query
{
    protected static $dsn = "mysql:host=localhost;dbname=tcc";
    protected static $user = "root";
    protected static $pass = "";
   
    public static function insertOrUpdate($qry) {
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stm = $pdo->prepare($qry);

            $stm->execute();

            return true;
        } catch (PDOException $e) {
            echo "Erro:" . $e->getMessage();
        }

        return;
    }

    public static function select($qry)
    {
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$pass);
            $result = $pdo->query($qry);

            if(!$result) {
                \http_response_code(500);
                echo "Erro na conexão com o banco";
                die();
            }
            $rows = $result->fetchAll(PDO::FETCH_CLASS);

            return json_encode($rows);
        } catch (PDOException $e) {
            echo "Erro:" . $e->getMessage();
        }
    }
}