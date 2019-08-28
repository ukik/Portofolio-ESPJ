<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarPptk extends Model
{
    protected $table = 'data_pptk';

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
