<?php
require __DIR__ . '/vendor/autoload.php';
require "controller/LeituraController.php";

use Workerman\Worker;

$worker = new Worker();

$worker->onWorkerStart = function(){
    $mqtt = new Workerman\Mqtt\Client('mqtt://broker.hivemq.com:1883');
    
    $mqtt->onConnect = function($mqtt) {
        $mqtt->subscribe('mobg/#', ["qos" => 0]);
    };
    
    $mqtt->onMessage = function($topic, $content){
        echo "\nTópico: " . $topic;
        echo "\nConteúdo: " . $content;

        //$controller = new LeituraController();

        //$conteudo = new \stdClass();
        //$conteudo->sensor = explode('/', $topic)[1];
        //$conteudo->valor = $content;

        //$controller->store($conteudo);
    };

    $mqtt->connect();
};

Worker::runAll();