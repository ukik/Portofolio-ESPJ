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

Route::prefix("/lampiran")->name('report.')->middleware(['jwt.recycle', 'signiture'])->group(function(){

    Route::get('/honor/{honor}/telaah', '\LampiranHonorController@telaah')->name('honor.telaah');
    Route::get('/honor/{honor}/print', '\LampiranHonorController@print')->name('honor.print');
    Route::get('/honor/{honor}/detail/{detail}/print', '\LampiranHonorDetailController@print')->name('honor.detail.print');

    Route::get('/spk/{spk}/telaah', '\LampiranSpkController@telaah')->name('spk.telaah');
    Route::get('/spk/{spk}/print', '\LampiranSpkController@print')->name('spk.print');
    Route::get('/spk/{spk}/rab/{rab}/print', '\LampiranSpkRabController@print')->name('spk.rab.print');
    
    Route::get('/perjadin/{perjadin}/telaah', '\LampiranPerjadinController@telaah')->name('perjadin.telaah');
    Route::get('/perjadin/{perjadin}/print', '\LampiranPerjadinController@print')->name('perjadin.print');
    Route::get('/perjadin/{perjadin}/detail/{detail}/print', '\LampiranPerjadinDetailController@print')->name('perjadin.detail.print');

});


