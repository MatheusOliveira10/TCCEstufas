<?php

namespace Models;

use Models\Query;
use Models\Helper;

class Model {
    protected $qry;
    protected $where;

    public static function all() {
        $qry = "SELECT * FROM $tabela";

        return json_encode($retorno);    
    }

    public function return() {
        $retorno = Query::select($qry);
    }
}