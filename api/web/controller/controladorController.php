<?php 

class controladorController{
    public function cadastro(){
        $qry = "SELECT passageiros.nome, passagens.id, assentos.id_aviao, assentos.posicao, passagens.data FROM passagens INNER JOIN assentos on passagens.id = assentos.id_passagem";
        $qry .= " INNER JOIN passageiros on passagens.id_passageiro = passageiros.id";
        
        $pdo = new Query();
        $passagens = $pdo->select($qry);
        include "view/cancelamentos/cadastro.php";
    }

    public function view(){
        $qry = "SELECT passagens.id, passageiros.nome, passagens.preco, cancelamentos.parcial, cancelamentos.data FROM cancelamentos ";
        $qry .= "INNER JOIN passagens on cancelamentos.id_passagem = passagens.id ";
        $qry .= "INNER JOIN passageiros on passagens.id_passageiro = passageiros.id";

        $pdo = new Query();
        $cancelamentos = $pdo->select($qry);

        include "view/cancelamentos/view.php";
    }

    public function save($request){
        $qry = "INSERT INTO cancelamentos(id_passagem, data, parcial) VALUES (";
        $qry .= "'" . $request['passagem'] . "'";
        $qry .= ",";
        $qry .= "'" . date('yy-m-d') . "'";
        $qry .= ",";
        $qry .= "'" . 'N' . "'";
        $qry .= ")";


        $pdo = new Query();
        $pdo->insert($qry);

        $qry = "UPDATE assentos SET id_passagem = null, ocupado = 'N' "; 
        $qry.= "WHERE id_passagem =" . $request['passagem'] . ";";
        $pdo = new Query();
        $pdo->insert($qry);

        $qry = "UPDATE passagens SET pago = 'restituido' ";
        $qry .= "WHERE id =" . $request['passagem'] . ";";
        $pdo = new Query();
        $pdo->insert($qry);

        header("Location: /cancela");
    }
}
?>