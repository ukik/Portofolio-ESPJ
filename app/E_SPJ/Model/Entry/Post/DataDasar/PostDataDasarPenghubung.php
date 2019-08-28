<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarPenghubung extends Model
{
    protected $table = 'data_penghubung';

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
