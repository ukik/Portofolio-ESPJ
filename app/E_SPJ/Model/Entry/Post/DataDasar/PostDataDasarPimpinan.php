<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarPimpinan extends Model
{
    protected $table = 'data_pimpinan';

    protected $fillable = [
        'id',
        'tahun',
        'pegawai_id',
        'nama',
        'singkatan',
        'bidang',
        'nip',
        'nomor_sk',
        'tanggal_sk',
        'aktif',
        'created_at',
        'updated_at',
    ];

}
