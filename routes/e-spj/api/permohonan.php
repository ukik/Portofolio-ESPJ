<?php

Route::name('permohonan.')->prefix('permohonan')->group(function(){
    Route::get('ganti-uang/{permohonan}/daftar/{rekening}', '\PermohonanGuController@daftar');
    Route::get('ganti-uang/{permohonan}/aliran-kas', '\PermohonanGuController@aliranKas');
    Route::post('ganti-uang/{permohonan}/aliran-kas', '\PermohonanGuController@aliranKasSave');
    Route::resource('ganti-uang', '\PermohonanGuController');
    Route::resource('uang-persediaan', '\PermohonanUpController');
    Route::post('uang-persediaan/create', '\PermohonanUpController@store');
});
