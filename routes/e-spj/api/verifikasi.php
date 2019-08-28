<?php

Route::name('verifikasi.')->prefix('verifikasi')->group(function(){
    Route::get('/', '\VerifikasiController@index')->name('index');

    Route::get('gu', '\VerifikasiGuController@index');
    Route::get('gu/{gu}/review', '\VerifikasiGuController@review');
    Route::post('gu/{gu}/approve', '\VerifikasiGuController@approve');
    Route::post('gu/{gu}/reject', '\VerifikasiGuController@reject');
    Route::post('gu/{gu}/update', '\VerifikasiGuController@update');

    Route::get('spj', '\VerifikasiSpjController@index');
    Route::get('spj/{spj}/review', '\VerifikasiSpjController@review');
    Route::post('spj/{spj}/approve', '\VerifikasiSpjController@approve');
    Route::post('spj/{spj}/reject', '\VerifikasiSpjController@reject');

    Route::get('honor', '\VerifikasiHonorController@index');
    Route::get('honor/{honor}/review', '\VerifikasiHonorController@review');
    Route::post('honor/{honor}/approve', '\VerifikasiHonorController@approve');
    Route::post('honor/{honor}/reject', '\VerifikasiHonorController@reject');

    Route::get('spk', '\VerifikasiSpkController@index');
    Route::get('spk/{spk}/review', '\VerifikasiSpkController@review');
    Route::post('spk/{spk}/approve', '\VerifikasiSpkController@approve');
    Route::post('spk/{spk}/reject', '\VerifikasiSpkController@reject');

    Route::get('perjadin', '\VerifikasiPerjadinController@index');
    Route::get('perjadin/{perjadin}/review/{from?}', '\VerifikasiPerjadinController@review');
    Route::get('perjadin/perubahan', '\VerifikasiPerjadinController@perubahan');

    Route::post('perjadin/{perjadin}/approve', '\VerifikasiPerjadinController@approve');
    Route::get('perjadin/{perjadin}/approve', '\VerifikasiPerjadinController@approve');
    Route::post('perjadin/{perjadin}/reject', '\VerifikasiPerjadinController@reject');
});
