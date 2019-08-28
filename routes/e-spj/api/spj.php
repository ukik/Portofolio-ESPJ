<?php

Route::name('spj.')->prefix('spj')->group(function(){

    Route::get('{spj}/rekap', '\SpjRekapController@index');
    Route::get('{spj}/rekap/create', '\SpjRekapController@create');
    Route::get('{spj}/rekap/{rekap}/edit', '\SpjRekapController@edit');
    Route::post('{spj}/rekap', '\SpjRekapController@store');
    Route::put('{spj}/rekap/{rekap}', '\SpjRekapController@update');
    Route::delete('{spj}/rekap/{rekap}', '\SpjRekapController@destroy');

    Route::get('{spj}/berkas', '\SpjBerkasController@index');
    Route::get('{spj}/berkas/create', '\SpjBerkasController@create');
    Route::post('{spj}/berkas', '\SpjBerkasController@store');
    Route::delete('{spj}/berkas/{berkas}', '\SpjBerkasController@destroy');
    Route::post('{spj}/berkas/upload', '\SpjBerkasController@upload');

    Route::get('/', '\SpjController@index');
    Route::get('{spj}', '\SpjController@show');
    Route::get('{spj}/edit', '\SpjController@edit');
    Route::post('/', '\SpjController@store');
    Route::put('{spj}', '\SpjController@update');
    Route::delete('{spj}', '\SpjController@destroy');
    Route::put('{spj}/submit', '\SpjController@submit');
    Route::post('{spj}/submit', '\SpjController@submit');
});
