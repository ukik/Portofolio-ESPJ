<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

# Passport
use Carbon\Carbon;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // # Passport
        Passport::routes();

        // # Passport Life-Cycle
        Passport::tokensExpireIn(Carbon::now()->addHours(24));//You can also use addDays(10)
        Passport::refreshTokensExpireIn(Carbon::now()->addHours(24));//You can also use addDays(10)
        //Passport::pruneRevokedTokens(); //basic garbage collector

        // # Passport Grant Authorization
        Passport::enableImplicitGrant();

        // # Passport Scopes
        Passport::tokensCan([
            'SuperAdmin'    => 'Super Admin',
            'Admin'         => 'Admin',
            'Penghubung'    => 'Penghubung',
            'Supervisor'    => 'Supervisor',
            'Verifikator'   => 'Verifikator',
        ]);        
    }
}
