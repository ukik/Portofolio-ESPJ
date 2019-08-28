<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarKas extends Model
{
    protected $table = 'data_kas';

    protected $fillable = [
        'id',
        'jenis_anggaran',
        'tahun',
        'kode_dpa',
        'kode_rekening',
        'jenis',
        'level',
        'bulan',
        'sisa_bulan_lalu',
        'rencana',
        'indikatif',
        'diajukan',
        'disetujui',
        'sisa_bulan_ini',
        'created_at',
        'updated_at',
    ];

}
