<?php

class Query
{
    public function insert($qry)
    {
        $dsn = "mysql:host=us-cdbr-east-03.cleardb.com;dbname=heroku_7ff5524695ed144";
        $user = "b37b895b6f3913";
        $pass = "e5c5b0b3";        

        try {
            $pdo = new PDO($dsn, $user, $pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stm = $pdo->prepare($qry);

            $stm->execute();
        } catch (PDOException $e) {
            echo "Erro:" . $e->getMessage();
        }
    }

    public function select($qry)
    {
        $dsn = "mysql:host=us-cdbr-east-03.cleardb.com;dbname=heroku_7ff5524695ed144";
        $user = "b37b895b6f3913";
        $pass = "e5c5b0b3";        

        try {
            $pdo = new PDO($dsn, $user, $pass);

            $result = $pdo->query($qry);
            $rows = $result->fetchAll(PDO::FETCH_CLASS);

            return $rows;
        } catch (PDOException $e) {
            echo "Erro:" . $e->getMessage();
        }
    }
}