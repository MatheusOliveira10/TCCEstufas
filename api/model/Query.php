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
            // $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
            
            $stm = $pdo->prepare($qry);

            if (!$stm) {
                return json_encode(["sucesso" => false, "mensagem" => $pdo->errorInfo()[2]]);
            }

            $stm->execute();

            return json_encode(["sucesso" => true, "id" => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            // echo "Erro:" . $e->getMessage();
            http_response_code(500);
            return json_encode(["sucesso" => false, "mensagem" => $e->getMessage()]);
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

                return json_encode(["sucesso" => false, "mensagem" =>"Erro na conexão com o banco"]);

                die();
            }
            $rows = $result->fetchAll(PDO::FETCH_CLASS);

            return json_encode($rows);
        } catch (PDOException $e) {
            http_response_code(500);
            echo "Erro:" . $e->getMessage();
        }
    }
}