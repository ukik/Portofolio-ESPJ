<?php

// use Session;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Auth;

class JWTRecycleToken
{

    public function handle($request, \Closure $next, $guard = null) {

        if (!$token = JWTAuth::getToken()) {
            return JWTResolver(['token' => 'token_not_provided'], 400);
        }        

        try {

            $user = JWTAuth::authenticate($token);

            $payload = JWTAuth::parseToken()->getPayload();

            if(!$user) {
                return JWTResolver(['token' => 'invalid_credentials'], 401);
            }
    
            Setter('old-token', JWTToken());
            Setter('tahun', $user->tahun_aktif);
            Setter('anggaran', $user->anggaran_aktif);
            
            $response = $next($request);
    
            # jika dijalankan old-token akan dihapus
            # status menjadi logout
            // JWTRevoke();        
            
            return $response;            

        } catch (JWTException $e) {

            // something went wrong
            return JWTResolver(['token' => 'could_not_create_token'], $e);
            // return response()->json(['error' => 'could_not_create_token'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return JWTResolver(['token' => 'token_expired'], $e);
            // return response()->json(array('token' => 'token_expired'), $e->getStatusCode());

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return JWTResolver(['token' => 'token_invalid'], $e);
            // return response()->json(array('token' => 'token_invalid'), $e->getStatusCode());

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

            return JWTResolver(['token' => 'token_absent'], $e);
            // return response()->json(array('token' => 'token_absent'), $e->getStatusCode());
            
        }
    }

    public function terminate($request, $response) {
        return "protocol clear";
    }

}