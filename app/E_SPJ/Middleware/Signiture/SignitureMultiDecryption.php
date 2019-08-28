<?php

# not used at this moment

class SignitureMultiDecryption
{

    public function handle($request, \Closure $next) {

        $parameter  = [];
        $keys       = [];
        $values     = [];

        foreach ($_REQUEST as $key => $value) {

            $value = SignitureInflate($value);

            $parameter += [ $key => $value ];

            array_push($keys, $key);
            array_push($values, $value);
        }

        Setter('parameter', $parameter);
        Setter('parameter-keys', $keys);
        Setter('parameter-values', $values);

        return $next($request);

    }

    public function terminate($request, $response) {
        return "protocol clear";
    }

}
