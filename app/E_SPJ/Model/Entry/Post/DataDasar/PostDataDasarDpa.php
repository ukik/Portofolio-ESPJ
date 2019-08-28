<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarDpa extends Model
{
    protected $table = 'data_dpa';

    protected $fillable = [
        'id',
        'jenis_anggaran',
        'tahun',
        'kode_dpa',
        'kode_rekening',
        'kode_surat',
        'jenis',
        'level',
        'nama',
        'pagu',
        'kpa_id',
        'kpa_singkatan',
        'pptk_id',
        'pptk_singkatan',
        'created_at',
        'updated_at',       
    ];  
    
}
