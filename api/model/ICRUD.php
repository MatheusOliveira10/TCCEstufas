<?php

namespace Models;

interface ICRUD {
    public function index();
      
    public function store($request);

    public function update($request);
    
    public function delete($request);
}