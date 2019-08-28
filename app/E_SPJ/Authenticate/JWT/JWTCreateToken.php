<?php

use App\User;

use Illuminate\Http\Request;

use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Hash;

class JWTCreateToken
{
    
    static public function Create($request) {
        
        $credentials = request(['username', 'password']);

        if(!\Auth::attempt($credentials))
            return response()->json([
                'message' => 'unauthorized'
            ], 401);

        $expiration_date = \Carbon\Carbon::now()->addHours(24)->timestamp;

        $user = $request->user();

        $signiture = Encrypt($user->password); 

        $custom_claims = [
            'exp'           => $expiration_date,
            'scopes'        => [ TrimString(ucfirst($user->level)) ],
            'signiture'     => $signiture,     
        ];

        # Creating a Token based on the users credentials
        # mode 1: attemp
        # $credentials = request(['username', 'password']);
        // $token = JWTAuth::attempt($credentials);
        // $token = JWTAuth::attempt($credentials, $custom_claims);

        # Creating a Token based on a user object
        # mode 1: fromUser
        # $user = User::find(1);
        // $token = JWTAuth::fromUser($request);
        $token = JWTAuth::fromUser($user, $custom_claims);


        # RESPONSE

        $post = \PostUser::find($user->id);
        
        $post->update([ 
            'signiture'         => $signiture,
            'tahun_aktif'       => $request->tahun, 
            'anggaran_aktif'    => $request->jenis_anggaran,
        ]);

        return response()->json([
                'data'      => 'create',
                'user'      => $post,
                'security'  => [
                    'signiture'         => $signiture,
                    'token'             => $token,
                    'scopes'            => $post->level,
                    'tahun'             => $post->tahun_aktif,
                    'jenis_anggaran'    => $post->anggaran_aktif,
                    'username'          => $post->username,
                    'bidang'            => $user->bidang->kode_surat,
                    // 'token_type'    => 'Bearer',
                    // 'access_info'   => $custom_claims,
                ],
            ])
            ->header('Content-Type', 'application/json')
            // ->header('Content-Type', 'application/x-www-form-urlencoded')
            ->setStatusCode(200);

    }  
}
