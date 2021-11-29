<?php

use Models\Query;
use Carbon\Carbon;
use Models\ICRUD;

class ControladorController implements ICRUD
{
    public function index()
    {
        $qry = 'SELECT * FROM controladores';
    
        echo Query::select($qry);
    }
      
    public function store($request)
    {
        $qry = "INSERT INTO controladores(nome, created_at, updated_at) VALUES (";
        $qry .= "'" . $request->nome . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ",";
        $qry .= "'" . Carbon::now()->toDateTimeString() . "'";
        $qry .= ")";

        $retorno = Query::insertOrUpdate($qry);

        $id = json_decode($retorno)->id;
        echo Query::select("SELECT * from controladores WHERE id={$id}");

        return;
    }
    
    public function update($request)
    {
        $agora = Carbon::now()->toDateTimeString();
    
        $qry = "UPDATE controladores SET nome='{$request->nome}', updated_at='$agora'";
        $qry .= " where id = {$request->id}";
    
        echo Query::insertOrUpdate($qry);
    }
    
      
    public function delete($request)
    {
        $qry = "DELETE FROM controladores";
        $qry .= " where id = {$request->id}";
    
        echo Query::insertOrUpdate($qry);
    }
}