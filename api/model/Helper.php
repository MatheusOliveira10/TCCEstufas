<?php

namespace Models;

use Models\Model;

class Helper extends Model {
    public static function dd($content) {
        var_dump($content);
        die();
    }
}