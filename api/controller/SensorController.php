<?php

use Models\Query;
use Carbon\Carbon;
use Models\ICRUD;

class SensorController implements ICRUD
{
    public function index()
    {
        $qry = 'SELECT * FROM sensores';
    
        echo Query::select($qry);
    }
      
    public function store($request)
    {
        $ativa = (int)$request->ativa;
    
        $qry = "INSERT INTO sensores(descricao, porta, tipo_porta, porta_atuador_minimo, porta_atuador_maximo, referencia_minima, referencia_maxima, unidade, tipo_sensor, controlador_id, created_at, updated_at) VALUES (";
        $qry .= "'" . $request->descricao . "'";
        $qry .= ",";
        $qry .= "'" . $request->porta . "'";
        $qry .= ",";
        $qry .= "'" . $request->tipo_porta . "'";
        $qry .= ",";
        $qry .= "'" . $request->porta_atuador_minimo . "'";
        $qry .= ",";
        $qry .= "'" . $request->porta_atuador_maximo . "'";
        $qry .= ",";
        $qry .= "'" . $request->referencia_minima . "'";
        $qry .= ",";
        $qry .= "'" . $request->referencia_maxima . "'";
        $qry .= ",";
        $qry .= "'" . $request->unidade . "'";
        $qry .= ",";
        $qry .= "'" . $request->tipo_sensor . "'";
        $qry .= ",";
        $qry .= "'" . $request->controlador_id . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ")";
    
        $retorno = Query::insertOrUpdate($qry);

        $id = json_decode($retorno)->id;
        echo Query::select("SELECT * from sensores WHERE id={$id}");
    }
    
    public function update($request)
    {
        $agora = Carbon::now()->toDateTimeString();
        $ativa = (int)$request->ativa;
    
        $qry = "UPDATE sensores SET descricao='{$request->descricao}', updated_at = '$agora'";
        $qry .= ",porta='{$request->porta}'";
        $qry .= ",tipo_porta='{$request->tipo_porta}'";
        $qry .= ",porta_atuador_minimo={$request->porta_atuador_minimo}";
        $qry .= ",porta_atuador_maximo={$request->porta_atuador_maximo}";
        $qry .= ",referencia_minima={$request->referencia_minima}";
        $qry .= ",referencia_maxima={$request->referencia_maxima}";
        $qry .= ",unidade='{$request->unidade}'";
        $qry .= ",tipo_sensor='{$request->tipo_sensor}'";
        $qry .= ",controlador_id={$request->controlador_id}";
        $qry .= " where id={$request->id}";
    
        echo Query::insertOrUpdate($qry);
    }
    
    public function delete($request)
    {
        $qry = "DELETE FROM sensores";
        $qry .= " where id = {$request->id}";
    
        echo Query::insertOrUpdate($qry);
    }
}
