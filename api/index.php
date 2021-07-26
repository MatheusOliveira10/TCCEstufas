<?php
header('Content-Type: application/json');

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
