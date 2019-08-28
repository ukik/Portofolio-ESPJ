
<?php

if (!function_exists('Resolver')) {
    function Resolver($compact)
    {
        $user = \Auth::user();

        $post = null;

        if(AuthCheck()) {
            $signiture = Encrypt($user->password); 

            $post = \PostUser::find($user->id);
            
            $security = $user->when(true, function () use ($user, $signiture) {
                return [
                    'signiture'         => '', 
                    'token'             => '', 
                    'scopes'            => $user->level,
                    'tahun'             => $user->tahun_aktif,
                    'jenis_anggaran'    => $user->anggaran_aktif,    
                    'username'          => $user->username,
                    'bidang'            => $user->bidang->kode_surat,
                ];
            });

        } else {
            $security = 'unauthorized';
        }        

        return response()->json([
            'data'      => $compact,
            'user'      => $post,
            'security'  => $security,
        ])
        ->header('Content-Type', 'application/json')
        // ->header('Content-Type', 'application/x-www-form-urlencoded')
        ->setStatusCode(200);
    }
}

if (!function_exists('JWTFResolver')) {
    function JWTResolver($compact, $e)
    {

        return response()->json([
                'data' => $compact,
                'security' => 'unauthorized',
            ])
            ->header('Content-Type', 'application/json')
            // ->header('Content-Type', 'application/x-www-form-urlencoded')
            ->setStatusCode(200);
    }
}

if (!function_exists('SimpleResolver')) {
    function SimpleResolver($compact)
    {

        return response()->json([
                'data' => $compact,
                'security' => 'unauthorized',
            ])
            ->header('Content-Type', 'application/json')
            // ->header('Content-Type', 'application/x-www-form-urlencoded')
            ->setStatusCode(200);
    }
}
