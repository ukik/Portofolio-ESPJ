<?php

if (!function_exists('JWTToken')) {
    function JWTToken()
    {
        # retrieve token
        $token = JWTAuth::getToken();
        return $token;
    }
}

if (!function_exists('JWTRevoke')) {
    function JWTRevoke()
    {
        return JWTAuth::invalidate(JWTToken());
    }
}

if (!function_exists('JWTUser')) {
    function JWTUser($token = null)
    {
        # retrieve authenticated user
        $user = JWTAuth::parseToken()->authenticate();
        return $user;

    }
}

if (!function_exists('JWTClaim')) {
    function JWTClaim()
    {
        # retrieve authenticated custom_claims
        $payload = JWTAuth::parseToken()->getPayload()->toArray();
        return $payload;
    }
}

if (!function_exists('JWTCreate')) {
    function JWTCreate()
    {

        $user = \Auth::user();

        $credentials = ['username' => $user->username, 'password' => $user->plain_password];

        if (!\Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $expiration_date = \Carbon\Carbon::now()->addWeeks(1)->timestamp;

        $custom_claims = [
            'exp' => $expiration_date,
            'scopes' => [TrimString(ucfirst($user->level))],
            'key' => Hash::make($user->password), 
        ];

        $token = JWTAuth::fromUser($user, $custom_claims);

        return $token;
    }
}

if (!function_exists('JWTRefresh')) {
    function JWTRefresh()
    {
        # Regenerate new token based on last token valid
        $token = JWTAuth::getToken();

        try {
            return JWTAuth::refresh($token);
        } catch (JWTException $e) {
            # Callback solution
            return response()->json([
                'error' => 'Something went wrong',
            ], 500);
        }
        
    }
}
