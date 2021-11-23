<?php

use Models\Query;
use Carbon\Carbon;

class RelatorioController
{
    public function gerar()
    {
        $pdo = new Query();
        $dataini = null;
        $datafim = null;

        if ($_GET['prd'] != null) {
            $periodo = explode(' - ', $_GET['prd']);
            $dataini = implode('-', array_reverse(explode('/', $periodo[0]))) . ' 00:00:00';
            $datafim = implode('-', array_reverse(explode('/', $periodo[1]))) . ' 23:59:59';
        } else {
            $dataini = Carbon::now();
            $dataini->firstOfMonth()->startOfDay()->toDateString();
            $datafim = Carbon::now();
            $datafim->endOfDay()->toDateString();
        }

        $qryRelatorio = "SELECT leituras.sensor_id, controladores.id as controlador_id, controladores.nome, sensores.descricao, DATE_FORMAT(leituras.created_at, '%d/%m/%Y') AS data, ROUND(AVG(valor), 2) AS valor
                            FROM leituras
                            INNER JOIN sensores ON leituras.sensor_id = sensores.id
                            INNER JOIN controladores ON sensores.controlador_id = controladores.id
                            WHERE leituras.created_at BETWEEN '$dataini' AND '$datafim'
                            AND leituras.valor != 0
                            GROUP BY sensores.descricao, controlador_id, YEAR(leituras.created_at), MONTH(leituras.created_at), DAY(leituras.created_at)
                            ORDER BY sensores.descricao, YEAR(leituras.created_at), MONTH(leituras.created_at), DAY(leituras.created_at)";
        // dd($qryRelatorio);
        $dados = Query::select($qryRelatorio);

        echo $dados;
    }
}
