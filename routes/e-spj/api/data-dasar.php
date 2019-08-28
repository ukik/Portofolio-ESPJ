<?php

Route::name('data-dasar.')->prefix('data-dasar')->group(function () {
    
    Route::get('dpa/{dpa}/aliran-kas', '\DataDasarDpaController@aliranKas');

    Route::resource('dpa', '\DataDasarDpaController');
    Route::resource('kpa', '\DataDasarKpaController');
    Route::resource('bidang', '\DataDasarBidangController');
    Route::resource('jabatan', '\DataDasarJabatanController');
    Route::resource('rekanan', '\DataDasarRekananController');
    Route::resource('pegawai', '\DataDasarPegawaiController');
    Route::resource('pptk', '\DataDasarPptkController');
    Route::resource('ppk', '\DataDasarPpkController');
    Route::resource('bendahara', '\DataDasarBendaharaController');
    Route::resource('penghubung', '\DataDasarPenghubungController');
    Route::resource('pimpinan', '\DataDasarPimpinanController');

    Route::resource('lokasi-luar-negeri', '\DataDasarLokasiLuarNegeriController');
    Route::resource('lokasi', '\DataDasarLokasiController');

});
