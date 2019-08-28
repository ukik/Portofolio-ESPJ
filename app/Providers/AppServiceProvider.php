<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

use Illuminate\Http\Resources\Json\Resource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        # ------------------------------------------------------------------------------
        # wajib: dipasang agar $ php artisak jwt:generate tidak error
        # ------------------------------------------------------------------------------
        $this->app->singleton('tymon.jwt.generate', function ($app) {
            return $app->make('App\Console\JWTFixes\JWTGenerateCommand');
        });        
        # ------------------------------------------------------------------------------

        Blade::component('_layouts.message', 'message');
        Blade::component('_layouts.errors', 'errors');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
