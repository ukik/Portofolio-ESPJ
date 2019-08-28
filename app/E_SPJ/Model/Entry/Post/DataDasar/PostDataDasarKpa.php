<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarKpa extends Model
{
    protected $table = 'data_kpa';

    protected $fillable = [
        'id',
        'tahun',
        'pegawai_id',
        'nama',
        'singkatan',
        'nip',
        'bidang',
        'nomor_sk',
        'tanggal_sk',
        'aktif',
        'created_at',
        'updated_at',
    ];

}
