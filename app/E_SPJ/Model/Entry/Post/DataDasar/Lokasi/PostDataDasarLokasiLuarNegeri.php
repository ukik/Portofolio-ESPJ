<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarLokasiLuarNegeri extends Model
{
    protected $table = 'data_lokasi_ln';

    protected $fillable = [
        'id',
        'induk_id',
        'tahun',
        'jenis',
        'nama',
        'nama_ibu_kota',
        'singkatan',
        'aktif',
        'created_at',
        'updated_at',
    ];

}
