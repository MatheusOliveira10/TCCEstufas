<?php
require "model/query.php";

class leituraController
{
    public function index()
    {
        include "view/index.php";
    }

    public function view()
    {
        $qry = "SELECT * FROM passageiros;";
        $pdo = new Query();
        $passageiros = $pdo->select($qry);
        include "view/passageiros/view.php";
    }

    public function save($request)
    {
        if(isset($request['PCD'])) {
            $pcd = 'S';
        }else{
            $pcd = 'N';
        }
        
        $qry = "INSERT INTO passageiros(nome, cpf, PCD) VALUES (";
        $qry .= "'" . $request['nome'] . "'";
        $qry .= ",";
        $qry .= "'" . $request['CPF'] . "'";
        $qry .= ",";
        $qry .= "'" . $pcd . "'";
        $qry .= ")";

        $pdo = new Query();
        $pdo->insert($qry);

        header("Location: /passageiro");
    }

    public function cadastro(){
        include "view/passageiros/cadastro.php";
    }
}
