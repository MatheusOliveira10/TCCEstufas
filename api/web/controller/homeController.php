<?php

class homeController{
  public function index(){
    $qry = "SELECT * FROM culturas;";
    $pdo = new Query();
    $culturas = $pdo->select($qry);
      
    header('Content-Type: application/json');

    echo json_encode($culturas);
  }
  
  public function login(){
    include "view/login.php";
  }
}