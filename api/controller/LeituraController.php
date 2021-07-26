<?php

use Models\Query;
use Carbon\Carbon;
use Models\ICRUD;

class LeituraController implements ICRUD
{
    public function index()
    {
        $qry = 'SELECT * FROM leituras';

        echo Query::select($qry);
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
