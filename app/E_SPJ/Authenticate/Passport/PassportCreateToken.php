<?php

class PassportCreateToken
{
    
    protected static $initial = 'Personal Access Token';

    static public function Create($request) {

        $credentials = request(['username', 'password']);

        if(!\Auth::attempt($credentials))
            return response()->json([
                'message' => 'unauthorized'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken(self::$initial, [ TrimString(ucfirst($user->level)) ]);

        $token = $tokenResult->token;
        $token['key'] = Encrypt($request->password); 

        // if (condition)
            $token->expires_at = \Carbon\Carbon::now()->addHours(24);

        # RESPONSE

        \PostUser::find($user->id);

        $post->update([ 
            'signiture'         => $signiture,
            'tahun_aktif'       => $request->tahun, 
            'anggaran_aktif'    => $request->jenis_anggaran,
        ]);

        return response()->json([
                'data'      => 'create',
                'user'      => $post,
                'security'  => [
                    'signiture'         => $token['key'],
                    'token'             => $tokenResult->accessToken,
                    'scopes'            => $post->level,
                    'tahun'             => $post->tahun_aktif,
                    'jenis_anggaran'    => $post->anggaran_aktif,
                    'username'          => $post->username,
                    'bidang'            => $user->bidang->kode_surat,
                    // 'token_type'    => 'Bearer',
                    // 'access_info'   => $token,
                    // 'expires_at'    => \Carbon\Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
                ],
            ])        
            ->header('Content-Type', 'application/json')
            // ->header('Content-Type', 'application/x-www-form-urlencoded')
            ->setStatusCode(200);
    }
}
