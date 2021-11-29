<?php

use Models\Query;
use Carbon\Carbon;
use Models\ICRUD;

class LeituraController implements ICRUD
{
    public function index()
    {
        $retorno = [];

        $culturas = json_decode(Query::select('SELECT * FROM culturas WHERE ativa = 1'));
        $sensores = json_decode(Query::select('SELECT * FROM sensores'));
        $controladores = json_decode(Query::select('SELECT controladores.id, controladores.nome, controladores_culturas.cultura_id FROM controladores INNER JOIN controladores_culturas ON controladores.id=controladores_culturas.controlador_id'));
        $leituras = json_decode(Query::select('SELECT * FROM leituras where created_at between "2021-11-01" and "2021-11-13"'));

        $retorno['culturas'] = $culturas;
        $retorno['sensores'] = $sensores;
        $retorno['controladores'] = $controladores;
        $retorno['leituras'] = $leituras;
        
        echo json_encode($retorno);
    }
      
    public function store($request)
    {
        $qry = "INSERT INTO leituras(valor, sensor_id, created_at) VALUES (";
        $qry .= "'" . $request->valor . "'";
        $qry .= ",";
        $qry .= "'" . $request->sensor . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ")";
    
        echo Query::insertOrUpdate($qry);
    }
    
    public function update($request)
    {
        $agora = Carbon::now()->toDateTimeString();
        $ativa = (int)$request->ativa;
    
        $qry = "UPDATE leituras SET descricao = '{$request->descricao}', ativa = {$ativa}, updated_at = '$agora'";
        $qry .= " where id = {$request->id}";
    
        echo Query::insertOrUpdate($qry);
    }
    
      
    public function delete($request)
    {
        $qry = "DELETE FROM leituras";
        $qry .= " where id = {$request->id}";
    
        echo Query::insertOrUpdate($qry);
    }
}
