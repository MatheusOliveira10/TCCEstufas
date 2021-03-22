<?php
require '../vendor/autoload.php';

require "controller/homeController.php";
require "controller/culturaController.php";
require "controller/controladorController.php";
require "controller/sensorController.php";
require "controller/leituraController.php";

$pagina = explode('/', $_SERVER['REQUEST_URI']);
$home = new homeController();
$cultura = new culturaController();
$controlador = new controladorController();
$sensor = new sensorController();
$leitura = new leituraController();

if (isset($pagina[2])) {
  $page = $pagina[1] . "/" . $pagina[2];
} else {
  $page = $pagina[1];
}

switch ($page) {
  case "":
    $home->index();
    break;
  default:
    $home->index();
    break;
}
