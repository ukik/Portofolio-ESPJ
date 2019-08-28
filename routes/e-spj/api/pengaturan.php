<?php

Route::name('pengaturan.')->prefix('pengaturan')->group(function(){
    Route::get('/', '\PengaturanController@index');

    Route::get('/nomor-surat', '\PengaturanController@nomorSuratForm');
    Route::post('/nomor-surat', '\PengaturanController@nomorSuratSave');

    Route::get('/honor', '\PengaturanController@honorForm');
    Route::post('/honor', '\PengaturanController@honorSave');

    Route::get('/pajak', '\PengaturanController@pajakForm');
    Route::post('/pajak', '\PengaturanController@pajakSave');

    Route::get('/honor', '\PengaturanController@honorForm');
    Route::post('/honor', '\PengaturanController@honorSave');

    Route::get('/sppd', '\PengaturanController@sppdForm');
    Route::post('/sppd', '\PengaturanController@sppdSave');

    Route::get('aliran-kas', '\PengaturanController@aliranKas');
    Route::get('aliran-kas/upload', '\PengaturanController@aliranKasUpload');
    Route::post('aliran-kas', '\PengaturanController@aliranKasUploadProcess');
    Route::get('aliran-kas/{id}/rincian', '\PengaturanController@aliranKasRincian');

    Route::resource('/user', '\PengaturanUserController');
    Route::resource('/tahun', '\PengaturanTahunController');
    Route::resource('/berkas', '\PengaturanBerkasController');
    Route::post('/berkas/{id}', '\PengaturanBerkasController@updateBerkas');
    
});
