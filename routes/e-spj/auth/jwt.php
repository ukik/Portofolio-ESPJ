<?php

# first init auto request
Route::get('init', '\LoginController@init')->middleware(['jwt.recycle']);

Route::get('login', '\LoginController@index');
Route::post('login', '\AuthenticateController@login');

// Route::get('zip', '\LoginController@zip');
// Route::get('download/satuan/{id?}', '\LoginController@satuan')->name('satuan.download');
// Route::get('download/{id?}', '\LoginController@download')->name('berkas.download');

Route::post('register', '\AuthenticateController@register');
Route::post('logout', '\AuthenticateController@logout');

