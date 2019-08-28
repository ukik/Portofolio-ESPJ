<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RekapPerjadinController extends Controller
{
    public function index()
    {
        $data = \GetRekapPerjadin::filterPaginate(5);

        $back = false;

        return Resolver(compact('data', 'back'));
    }
}