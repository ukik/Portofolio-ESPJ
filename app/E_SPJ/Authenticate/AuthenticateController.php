<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Http\Controllers\Controller;

use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateController extends Controller
{

    public function login(Request $request)
    {
        $this->validate(request(), [
            'username' => 'required',
            'password' => 'required',
            'tahun' => 'required',
            'jenis_anggaran' => 'required',
        ]);

        return JWTCreateToken::Create($request);
        // return PassportCreateToken::Create($request);
    }
  
    public function logout(Request $request)
    {
        return JWTRevokeToken::Revoke($request);
        // return PassportRevokeToken::Revoke($request);
    }

}