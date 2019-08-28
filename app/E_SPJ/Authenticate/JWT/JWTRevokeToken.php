<?php

use App\User;

use Illuminate\Http\Request;

use Tymon\JWTAuth\Exception\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Hash;

class JWTRevokeToken
{

    static public function Revoke($request) {

        if (!$token = JWTAuth::getToken()) {
            return JWTResolver(['token' => 'token_not_provided'], 400);
        }    

        $token = JWTAuth::getToken();
        $user = JWTUser();

        try {
            JWTAuth::invalidate($token);

            \PostUser::find($user->id)->update([
                'signiture'         => null,
                'tahun_aktif'       => null,
                'anggaran_aktif'    => null,
            ]);

            return response()->json([
                    'data'      => 'revoke',
                    'security'  => [
                        'signiture'         => null,
                        'token'             => null,
                        'scopes'            => null,
                        'tahun'             => null,
                        'jenis_anggaran'    => null,
                        'username'          => null,           
                        'bidang'            => null,             
                    ],
                ])
                ->header('Content-Type', 'application/json')
                // ->header('Content-Type', 'application/x-www-form-urlencoded')
                ->setStatusCode(200);

        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token

            return JWTResolver(['message' => 'could_not_create_token'], $e);

        }
    }
}