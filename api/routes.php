<?php

require "controller/ControladorController.php";
require "controller/CulturaController.php";
require "controller/LeituraController.php";
require "controller/SensorController.php";

$controlador = new ControladorController();
$cultura = new CulturaController();
$leitura = new LeituraController();
$sensor = new SensorController();

function verificaMetodo($metodoCorreto) {
    if (!in_array($_SERVER['REQUEST_METHOD'], $metodoCorreto)) {
        http_response_code(405);
        echo "Método não permitido";
        die();
    }
}

$routes = [
    "/controladores" => function() use ($controlador) {
        verificaMetodo(["GET", "POST", "PUT", "DELETE"]);

        switch($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $controlador->index();
                break;

            case 'POST':
                $controlador->store($_POST);
                break;

            case 'PUT':
                $controlador->update($_POST);
                break;

            case 'DELETE':
                $controlador->delete($_POST);
                break;    
        } 
    },
    "/culturas" => function() use ($cultura) {
        verificaMetodo(["GET", "POST", "PUT", "DELETE"]);
        
        switch($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $cultura->index();
                break;

            case 'POST':
                $cultura->store($_POST);
                break;

            case 'PUT':
                $cultura->update($_POST);
                break;

            case 'DELETE':
                $cultura->delete($_POST);
                break;    
        } 
    },
    "/sensores" => function() use ($sensor) {
        verificaMetodo(["GET", "POST", "PUT", "DELETE"]);
        
        switch($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $sensor->index();
                break;

            case 'POST':
                $sensor->store($_POST);
                break;

            case 'PUT':
                $sensor->update($_POST);
                break;

            case 'DELETE':
                $sensor->delete($_POST);
                break;    
        } 
    },
    "/leituras" => function() use ($leitura) {
        verificaMetodo(["GET", "POST", "PUT", "DELETE"]);
        
        switch($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $leitura->index();
                break;

            case 'POST':
                $leitura->store($_POST);
                break;

            case 'PUT':
                $leitura->update($_POST);
                break;

            case 'DELETE':
                $leitura->delete($_POST);
                break;    
        } 
    },
];