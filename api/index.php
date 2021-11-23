<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");   
header("Content-Type: application/json; charset=UTF-8");    
header("Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS");    
header("Access-Control-Max-Age: 3600");    
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
http_response_code(200);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
  return 0;    
}   

require __DIR__ . '/vendor/autoload.php';

include "routes.php";
include "helpers.php";

$url = parse_url($_SERVER['REQUEST_URI']);

if(!isset($routes[$url['path']])) {
  http_response_code(404);
  echo '404';
  die();
}

if($_SERVER['REQUEST_METHOD'] != "GET") {
  $_POST = json_decode(file_get_contents("php://input"));
}

$routes[$url['path']]();