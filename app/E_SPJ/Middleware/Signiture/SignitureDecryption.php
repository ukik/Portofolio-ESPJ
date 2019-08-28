<?php


class SignitureDecryption
{

    public function handle($request, \Closure $next) {

        if(!isset($_GET['signiture']) || empty($_GET['signiture'])) {
            return SimpleResolver(['signiture' => 'signiture_not_provided']);
        }

        // if wants without signiture check
        return $next($request);        

        $user = \Auth::user();
        
        if($user) {
            if($user->signiture == $_GET['signiture']) {
                return $next($request);
            }
        }

        return SimpleResolver(['signiture' => 'signiture_invalid']);

    }

    public function terminate($request, $response) {
        return "protocol clear";
    }

}
