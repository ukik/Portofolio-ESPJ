<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarLokasi extends Model
{
    protected $table = 'data_lokasi';

    protected $fillable = [
        'id',
        'induk_id',
        'tahun',
        'jenis',
        'nama',
        'singkatan',
        'dalam_daerah',
        'aktif',
        'created_at',
        'updated_at',        
    ];

}
