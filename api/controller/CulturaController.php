<?php

use Models\Query;
use Carbon\Carbon;
use Models\ICRUD;

class CulturaController implements ICRUD
{
    public function index()
    {
        $qry = 'SELECT * FROM culturas';

        echo Query::select($qry);
    }
  
    public function store($request)
    {
        $ativa = (int)$request->ativa;

        $qry = "INSERT INTO culturas(descricao, ativa, created_at, updated_at) VALUES (";
        $qry .= "'" . $request->descricao . "'";
        $qry .= ",";
        $qry .= "'" . $ativa . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ")";

        $retorno = Query::insertOrUpdate($qry);

        $id = json_decode($retorno)->id;
        echo Query::select("SELECT * from culturas WHERE id={$id}");
    }

    public function update($request)
    {
        $agora = Carbon::now()->toDateTimeString();
        $ativa = (int)$request->ativa;

        $qry = "UPDATE culturas SET descricao = '{$request->descricao}', ativa = {$ativa}, updated_at = '$agora'";
        $qry .= " where id = {$request->id}";

        echo Query::insertOrUpdate($qry);
    }

  
    public function delete($request)
    {
        $qry = "DELETE FROM culturas";
        $qry .= " WHERE id = {$request->id}";

        echo Query::insertOrUpdate($qry);
    }
}
