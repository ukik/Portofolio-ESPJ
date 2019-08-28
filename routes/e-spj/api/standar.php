<?php

Route::name('standar.')->prefix('standar')->group(function(){

    Route::resource('perjadin/transportasi', '\StandarPerjadinTransportasiController');
    Route::resource('perjadin/representatif', '\StandarPerjadinRepresentatifController');
    Route::resource('hotel/dalam', '\StandarPerjadinHotelDalamController');
    Route::resource('hotel/luar', '\StandarPerjadinHotelLuarController');
    Route::resource('harian/dalam', '\StandarPerjadinHarianDalamController');
    Route::resource('harian/luar', '\StandarPerjadinHarianLuarController');
    Route::resource('honor', '\StandarHonorController');
});
