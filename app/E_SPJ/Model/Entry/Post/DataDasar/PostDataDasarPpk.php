<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarPpk extends Model
{
    protected $table = 'data_ppk';

    protected $fillable = [
        'id',
        'tahun',
        'pegawai_id',
        'nama',
        'singkatan',
        'nip',
        'nomor_sk',
        'tanggal_sk',
        'aktif',
        'created_at',
        'updated_at',
    ];

}
