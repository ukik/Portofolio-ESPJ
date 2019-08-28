<?php

Route::name('rekap.')->prefix('rekap')->group(function(){

    Route::get('/honor', '\RekapHonorController@index');
    Route::get('/perjadin', '\RekapPerjadinController@index');
    Route::get('/spj', '\RekapBerkasSpjController@index');

});