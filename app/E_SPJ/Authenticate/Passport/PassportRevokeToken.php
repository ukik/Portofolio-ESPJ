<?php

use League\OAuth2\Server\Exception\OAuthServerException;

class PassportRevokeToken
{

    static public function Revoke($request) {

		$passport   = $request->header('Authorization');		
        $passport   = str_replace('Bearer ', '', $passport);
        
        try {
            $request->user()->token()->revoke();

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

        } catch (OAuthServerException $exception) {

            // something went wrong whilst attempting to encode the token
            return JWTResolver(['message' => 'could_not_create_token'], $exception);

        }
    }   
}