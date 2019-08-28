<?php

use Illuminate\Database\Eloquent\Model;

class PostSpjRekap extends Model
{
    protected $table = 'spj_rekap';

    protected $fillable = [
        'id',
        'spj_id',
        'permohonan_id',
        'permohonan_detail_id',
        'kode_dpa',
        'kode_rekening',
        'penerima',
        'uraian',
        'tanggal',
        'nominal',
        'ppn_persen',
        'ppn_nilai',
        'pph_21_persen',
        'pph_21_nilai',
        'pph_22_persen',
        'pph_22_nilai',
        'pph_23_persen',
        'pph_23_nilai',
        'jumlah',
        'created_at',
        'updated_at',
    ];

}
