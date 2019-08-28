<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));

        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/print/report.php'));             

        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/download/file.php'));        
             
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/wildcard/redirect.php'));                   
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));

        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/auth/jwt.php'));             

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/data-dasar.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/lampiran.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/pengaturan.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/spj.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/permohonan.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/standar.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/verifikasi.php'));

        Route::prefix('api')
             ->middleware(['api', 'jwt.recycle', 'signiture'])
             ->namespace($this->namespace)
             ->group(base_path('routes/e-spj/api/rekap.php'));             
    }
}
