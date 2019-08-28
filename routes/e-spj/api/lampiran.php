<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::name('lampiran.')->prefix('lampiran')->group(function () {

    Route::get('honor', '\LampiranHonorController@index');
    Route::get('honor/create', '\LampiranHonorController@create');
    Route::post('honor/create', '\LampiranHonorController@store');
    Route::get('honor/{honor}/edit', '\LampiranHonorController@edit');
    Route::put('honor/{honor}/edit', '\LampiranHonorController@update');
    Route::delete('honor/{honor}', '\LampiranHonorController@destroy');
    Route::get('honor/{honor}/print', '\LampiranHonorController@print');
    Route::post('honor/{honor}/ajukan', '\LampiranHonorController@ajukan');
    Route::get('honor/{honor}/ajukan', '\LampiranHonorController@ajukan');        
    Route::post('honor/{honor}/batal', '\LampiranHonorController@batal');
    Route::get('honor/{honor}/telaah', '\LampiranHonorController@telaah');

    Route::get('honor/{honor}/detail', '\LampiranHonorDetailController@index');
    Route::get('honor/{honor}/detail/create', '\LampiranHonorDetailController@create');
    Route::post('honor/{honor}/detail/create', '\LampiranHonorDetailController@store');
    Route::get('honor/{honor}/detail/{detail}/edit', '\LampiranHonorDetailController@edit');
    Route::put('honor/{honor}/detail/{detail}/edit', '\LampiranHonorDetailController@update');
    Route::delete('honor/{honor}/detail/{detail}', '\LampiranHonorDetailController@destroy');
    Route::get('honor/{honor}/detail/{detail}/print', '\LampiranHonorDetailController@print');

    Route::get('spk', '\LampiranSpkController@index');
    Route::post('spk/create', '\LampiranSpkController@store');
    Route::get('spk/create', '\LampiranSpkController@create');
    Route::get('spk/{spk}/edit', '\LampiranSpkController@edit');
    Route::put('spk/{spk}/edit', '\LampiranSpkController@update');
    Route::delete('spk/{spk}', '\LampiranSpkController@destroy');
    Route::get('spk/{spk}/print', '\LampiranSpkController@print');
    Route::post('spk/{spk}/ajukan', '\LampiranSpkController@ajukan');
    Route::get('spk/{spk}/ajukan', '\LampiranSpkController@ajukan');
    Route::post('spk/{spk}/batal', '\LampiranSpkController@batal');
    Route::get('spk/{spk}/telaah', '\LampiranSpkController@telaah');

    Route::get('spk/{spk}/rab', '\LampiranSpkRabController@index');
    Route::get('spk/{spk}/rab/create', '\LampiranSpkRabController@create');
    Route::put('spk/{spk}/rab', '\LampiranSpkRabController@update');
    Route::delete('spk/rab/{rab}', '\LampiranSpkRabController@destroy');
    Route::get('spk/{spk}/rab/{rab}/print', '\LampiranSpkRabController@print');

    Route::resource('perjadin/perubahan', '\LampiranPerjadinPerubahanController');
    Route::post('perjadin/perubahan/create', '\LampiranPerjadinPerubahanController@store');
    
    Route::get('perjadin', '\LampiranPerjadinController@index');
    Route::get('perjadin/create', '\LampiranPerjadinController@create');
    Route::post('perjadin/create', '\LampiranPerjadinController@store');
    Route::get('perjadin/{perjadin}/edit', '\LampiranPerjadinController@edit');
    Route::put('perjadin/{perjadin}/edit', '\LampiranPerjadinController@update');
    Route::delete('perjadin/{perjadin}', '\LampiranPerjadinController@destroy');
    Route::get('perjadin/{perjadin}/print', '\LampiranPerjadinController@print');
    Route::post('perjadin/{perjadin}/ajukan', '\LampiranPerjadinController@ajukan');
    Route::get('perjadin/{perjadin}/ajukan', '\LampiranPerjadinController@ajukan');
    Route::post('perjadin/{perjadin}/batal', '\LampiranPerjadinController@batal');
    Route::get('perjadin/{perjadin}/batal', '\LampiranPerjadinController@batal');
    Route::get('perjadin/{perjadin}/telaah', '\LampiranPerjadinController@telaah');

    Route::get('perjadin/{perjadin}/detail', '\LampiranPerjadinDetailController@index');
    Route::get('perjadin/{perjadin}/detail/create', '\LampiranPerjadinDetailController@create');
    Route::post('perjadin/{perjadin}/detail/create', '\LampiranPerjadinDetailController@store');
    Route::get('perjadin/{perjadin}/detail/{detail}/edit', '\LampiranPerjadinDetailController@edit');
    Route::put('perjadin/{perjadin}/detail/{detail}/edit', '\LampiranPerjadinDetailController@update');
    Route::delete('perjadin/{perjadin}/detail/{detail}', '\LampiranPerjadinDetailController@destroy');
    Route::get('perjadin/{perjadin}/detail/{detail}/print', '\LampiranPerjadinDetailController@print');
    Route::get('perjadin/{perjadin}/detail/{detail}/biaya', '\LampiranPerjadinDetailController@biaya');
    Route::post('perjadin/{perjadin}/detail/{detail}/biaya', '\LampiranPerjadinDetailController@biayaCreate');
    Route::put('perjadin/{perjadin}/detail/{detail}/biaya', '\LampiranPerjadinDetailController@biayaSave');
    Route::delete('perjadin/{perjadin}/detail/{detail}/biaya/{biaya}', '\LampiranPerjadinDetailController@biayaDestroy');

});
