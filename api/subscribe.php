<?php
require __DIR__ . '/vendor/autoload.php';
require "web/model/query.php";

use Workerman\Worker;

$worker = new Worker();

$worker->onWorkerStart = function(){
    $mqtt = new Workerman\Mqtt\Client('mqtt://test.mosquitto.org:1883');

    $mqtt->onConnect = function($mqtt) {
        $mqtt->subscribe('mobg/#', ["qos" => 2]);
    };

    $mqtt->onMessage = function($topic, $content){
        echo("topic");
        $pdo = new Query();

        $qry = "INSERT INTO teste(teste) VALUES (";
        $qry .= "'" . $content . "'";
        $qry .= ")";

        $pdo->insert($qry);
    };

    $mqtt->connect();
};

Worker::runAll();