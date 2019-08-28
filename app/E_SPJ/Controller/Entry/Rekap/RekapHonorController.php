<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RekapHonorController extends Controller
{
    public function index()
    {
        $data = \GetRekapHonor::filterPaginate(5);

        $back = false;

        return Resolver(compact('data', 'back'));
    }
}