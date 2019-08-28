<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RekapBerkasSpjController extends Controller
{
    public function index()
    {
        $data = \GetRekapBerkasSpj::filterPaginate(5);

        $back = false;

        return Resolver(compact('data', 'back'));        
    }
}