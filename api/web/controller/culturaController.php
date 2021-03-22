<?php

class culturaController{
  public function index(){
    $teste = [
      [
        "tipoSensor" => 'analog',
        "sensor" => 'umidade',
        "porta" => "10",
      ],
      [
        "tipoSensor" => 'digital',
        "sensor" => 'temperatura',
        "porta" => "11",
      ]
      ];
      
      echo json_encode($teste);
  }
  
  public function login(){
    include "view/login.php";
  }
}