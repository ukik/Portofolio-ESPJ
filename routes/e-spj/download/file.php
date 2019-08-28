
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

Route::get('spj/api/spj/{spj}/berkas/{berkas}/{nama}/download', '\SpjBerkasController@download');

Route::get('zip', '\LoginController@zip');
Route::get('download/satuan/{id?}', '\LoginController@satuan')->name('satuan.download');
Route::get('download/{id?}', '\LoginController@download')->name('berkas.download');
