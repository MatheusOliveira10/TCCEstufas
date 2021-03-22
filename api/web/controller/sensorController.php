<?php

class sensorController
{

    public function pagar($request)
    {
        $qry = "INSERT INTO pagamentos(id_passagem, data) VALUES (";
        $qry .= "'" . $request['passageiro'] . "'";
        $qry .= ",";
        $qry .= "'" . date('yy-m-d') . "'";
        $qry .= ")";

        $pdo = new Query();
        $pdo->insert($qry);

        $qryUpPag = "UPDATE passagens SET pago = 'S' WHERE id = ";
        $qryUpPag .= $request['passageiro'];
        $pdo->insert($qryUpPag);

        header("Location: /pagamento");
    }

    public function cadastro()
    {
        $qry = "SELECT passagens.*, passageiros.nome FROM passagens INNER JOIN passageiros on passagens.id_passageiro = passageiros.id";
        //$qry .= " WHERE passagens.pago <> 'S'";

        $pdo = new Query();

        $passagens = $pdo->select($qry);

        include "view/pagamentos/cadastro.php";
    }

    public function view()
    {
        $qry = "SELECT pagamentos.*, passageiros.nome, passagens.preco FROM pagamentos";
        $qry .= " INNER JOIN passagens ON pagamentos.id_passagem = passagens.id";
        $qry .= "  INNER JOIN passageiros on passagens.id_passageiro = passageiros.id";

        $pdo = new Query();

        $pagamentos = $pdo->select($qry);

        include "view/pagamentos/view.php";
    }
}
