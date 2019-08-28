<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarBendahara extends Model
{
    protected $table = 'data_bendahara';

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
